<?php

namespace App\Http\Controllers;

use App\Models\Tip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TipController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'service_name' => 'required|string|max:255',
            'posted_name' => 'required|string|max:255',
            'posted_date' => 'required|date',
            'title' => 'required|string|max:255',
            'text' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:10048',
        ]);

        $tip = new Tip();
        $tip->service_name = $request->service_name;
        $tip->posted_name = $request->posted_name;
        $tip->posted_date = $request->posted_date;
        $tip->title = $request->title;
        $tip->text = $request->text;

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images/tips'), $imageName);
            $tip->image = 'images/tips/' . $imageName;
        }

        $tip->save();

        return response()->json(['message' => 'Tip created successfully!', 'data' => $tip], 201);
    }

    public function index()
    {
        $tips = Tip::all();
        return response()->json($tips);
    }

    public function show($id)
    {
        $tip = Tip::find($id);

        if (!$tip) {
            return response()->json(['message' => 'Tip not found'], 404);
        }

        return response()->json($tip);
    }

    public function update(Request $request, $id)
    {
        $tip = Tip::find($id);

        if (!$tip) {
            return response()->json(['message' => 'Tip not found'], 404);
        }

        $request->validate([
            'service_name' => 'required|string|max:255',
            'posted_name' => 'required|string|max:255',
            'posted_date' => 'required|date',
            'title' => 'required|string|max:255',
            'text' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:10048',
        ]);

        $tip->service_name = $request->service_name;
        $tip->posted_name = $request->posted_name;
        $tip->posted_date = $request->posted_date;
        $tip->title = $request->title;
        $tip->text = $request->text;

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($tip->image && file_exists(public_path($tip->image))) {
                unlink(public_path($tip->image));
            }
            // Upload the new image
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images/tips'), $imageName);
            $tip->image = 'images/tips/' . $imageName;
        }

        $tip->save();

        return response()->json(['message' => 'Tip updated successfully!', 'data' => $tip], 200);
    }

    public function destroy($id)
    {
        $tip = Tip::find($id);

        if (!$tip) {
            return response()->json(['message' => 'Tip not found'], 404);
        }

        // Delete the associated image if it exists
        if ($tip->image && file_exists(public_path($tip->image))) {
            unlink(public_path($tip->image));
        }

        $tip->delete();

        return response()->json(['message' => 'Tip deleted successfully!'], 200);
    }
}