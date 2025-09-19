<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GalleryController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:10048',
            ]);

            $gallery = new Gallery();

            if ($request->hasFile('image')) {
                $imageName = time() . '.' . $request->file('image')->extension();
                $request->file('image')->move(public_path('images/tips'), $imageName);
                $gallery->image = 'images/tips/' . $imageName;
            }

            $gallery->save();

            return response()->json([
                'message' => 'Image uploaded successfully!',
                'id' => $gallery->id,
                'image' => $gallery->image,
                'image_url' => asset($gallery->image) . '?t=' . time(),
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error uploading image: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to upload image.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function index(Request $request)
    {
        try {
            $perPage = 10;
            $page = $request->query('page', 1);

            $galleries = Gallery::orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);

            $galleries->getCollection()->transform(function ($gallery) {
                return [
                    'id' => $gallery->id,
                    'image' => $gallery->image,
                    'image_url' => asset($gallery->image) . '?t=' . time(),
                ];
            });

            // Manually construct links array
            $links = [];
            $paginator = $galleries->toArray();
            $totalPages = $paginator['last_page'];
            $currentPage = $paginator['current_page'];

            if ($currentPage > 1) {
                $links[] = ['url' => $paginator['prev_page_url'], 'label' => '« Previous', 'active' => false];
            }

            for ($i = 1; $i <= $totalPages; $i++) {
                $links[] = [
                    'url' => $paginator['path'] . '?page=' . $i,
                    'label' => (string)$i,
                    'active' => $i === $currentPage,
                ];
            }

            if ($currentPage < $totalPages) {
                $links[] = ['url' => $paginator['next_page_url'], 'label' => 'Next »', 'active' => false];
            }

            return response()->json([
                'data' => $galleries->items(),
                'links' => $links,
                'current_page' => $galleries->currentPage(),
                'last_page' => $galleries->lastPage(),
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching gallery: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch gallery images.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $gallery = Gallery::findOrFail($id);
            return response()->json([
                'id' => $gallery->id,
                'image' => $gallery->image,
                'image_url' => asset($gallery->image) . '?t=' . time(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gallery not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $gallery = Gallery::findOrFail($id);

            $request->validate([
                'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:10048',
            ]);

            if ($request->hasFile('image')) {
                if ($gallery->image && file_exists(public_path($gallery->image))) {
                    unlink(public_path($gallery->image));
                }
                $imageName = time() . '.' . $request->file('image')->extension();
                $request->file('image')->move(public_path('images/tips'), $imageName);
                $gallery->image = 'images/tips/' . $imageName;
            }

            $gallery->save();

            return response()->json([
                'message' => 'Image updated successfully!',
                'id' => $gallery->id,
                'image' => $gallery->image,
                'image_url' => asset($gallery->image) . '?t=' . time(),
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating image: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to update image.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $gallery = Gallery::findOrFail($id);

            if ($gallery->image && file_exists(public_path($gallery->image))) {
                unlink(public_path($gallery->image));
            }

            $gallery->delete();

            return response()->json(['message' => 'Image deleted successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gallery not found'], 404);
        }
    }
}