<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CaseStudyController extends Controller
{
    public function index()
    {
        return CaseStudy::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
            'client' => 'required|string',
            'location' => 'required|string',
            'completed_date' => 'required|date',
            'project_value' => 'required|numeric',
            'manner' => 'required|string',
            'designer' => 'required|string',
            'title' => 'required|string',
            'case_explanation' => 'required|string',
            'case_heading' => 'required|string',
            'case_paragraph' => 'required|string',
            'image' => 'nullable|image|max:10048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move(public_path('images/tips'), $imageName);
            $data['image_url'] = 'images/tips/' . $imageName;
        }

        $caseStudy = CaseStudy::create($data);
        return response()->json($caseStudy, 201);
    }

    public function show($id)
    {
        return CaseStudy::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $caseStudy = CaseStudy::findOrFail($id);

        $request->validate([
            'category' => 'required|string',
            'client' => 'required|string',
            'location' => 'required|string',
            'completed_date' => 'required|date',
            'project_value' => 'required|numeric',
            'manner' => 'required|string',
            'designer' => 'required|string',
            'title' => 'required|string',
            'case_explanation' => 'required|string',
            'case_heading' => 'required|string',
            'case_paragraph' => 'required|string',
            'image' => 'nullable|image|max:10048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($caseStudy->image_url && file_exists(public_path($caseStudy->image_url))) {
                unlink(public_path($caseStudy->image_url));
            }
            $imageName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move(public_path('images/tips'), $imageName);
            $data['image_url'] = 'images/tips/' . $imageName;
        }

        $caseStudy->update($data);
        return response()->json($caseStudy, 200);
    }

    public function destroy($id)
    {
        $caseStudy = CaseStudy::findOrFail($id);
        if ($caseStudy->image_url && file_exists(public_path($caseStudy->image_url))) {
            unlink(public_path($caseStudy->image_url));
        }
        $caseStudy->delete();
        return response()->json(null, 204);
    }
}