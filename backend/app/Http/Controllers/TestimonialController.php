<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        try {
            $testimonials = Testimonial::all();
            if ($testimonials->isEmpty()) {
                return response()->json([], 200);
            }
            return response()->json($testimonials);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to retrieve testimonials', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'author' => 'required|string|max:255',
            'text' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
            'author_role' => 'nullable|string|max:255',
        ]);

        try {
            $data = [
                'text' => $request->input('text'),
                'author_name' => $request->input('author'),
                'author_role' => $request->input('author_role'),
                'image' => 'images/tips/default-image.jpg',
            ];

            \Log::info('Testimonial data: ', $data);

            $testimonial = Testimonial::create($data);

            if ($request->hasFile('photo')) {
                $imageName = time() . '.' . $request->file('photo')->extension();
                $request->file('photo')->move(public_path('images/tips'), $imageName);
                $testimonial->image = 'images/tips/' . $imageName;
                $testimonial->save();
            }

            return response()->json($testimonial, 201);
        } catch (\Exception $e) {
            if (isset($testimonial)) {
                $testimonial->delete();
            }
            return response()->json(['message' => 'Failed to create testimonial', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);
            return response()->json($testimonial);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Testimonial not found', 'error' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);

            $request->validate([
                'author' => 'sometimes|required|string|max:255',
                'text' => 'sometimes|required|string',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
                'author_role' => 'sometimes|nullable|string|max:255',
            ]);

            $data = [];
            if ($request->has('text')) {
                $data['text'] = $request->text;
            }
            if ($request->has('author')) {
                $data['author_name'] = $request->author;
            }
            if ($request->has('author_role')) {
                $data['author_role'] = $request->author_role;
            }

            $testimonial->update($data);

            if ($request->hasFile('photo')) {
                if ($testimonial->image && file_exists(public_path($testimonial->image))) {
                    unlink(public_path($testimonial->image));
                }
                $imageName = time() . '.' . $request->file('photo')->extension();
                $request->file('photo')->move(public_path('images/tips'), $imageName);
                $testimonial->image = 'images/tips/' . $imageName;
                $testimonial->save();
            }

            return response()->json($testimonial);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update testimonial', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $testimonial = Testimonial::findOrFail($id);

            if ($testimonial->image && file_exists(public_path($testimonial->image))) {
                unlink(public_path($testimonial->image));
            }

            $testimonial->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete testimonial', 'error' => $e->getMessage()], 500);
        }
    }
}