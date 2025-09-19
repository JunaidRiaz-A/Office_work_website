<?php

namespace App\Http\Controllers;

use App\Models\JobCandidate;
use Illuminate\Http\Request;

class JobCandidateController extends Controller
{
    public function index()
    {
        return JobCandidate::with('job')->get();
    }

    public function store(Request $request)
    {
        try {
            \Log::info($request->all());

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:15',
                'resume' => 'nullable|file|mimes:pdf,doc,docx|max:10048',
                'job_id' => 'nullable|exists:jobs,id', 
            ]);

            if ($request->hasFile('resume')) {
                $filePath = $request->file('resume')->store('resumes', 'public');
                $validatedData['resume'] = $filePath;
            }

            $jobCandidate = JobCandidate::create($validatedData);

            return response()->json([
                'message' => 'Application submitted successfully!',
                'data' => $jobCandidate,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $jobCandidate = JobCandidate::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|max:255',
                'phone' => 'sometimes|string|max:15',
                'resume' => 'nullable|file|mimes:pdf,doc,docx|max:10048',
                'checked' => 'sometimes|boolean',
                'job_id' => 'sometimes|exists:jobs,id', // Validate job_id
            ]);

            if ($request->hasFile('resume')) {
                if ($jobCandidate->resume) {
                    \Storage::disk('public')->delete($jobCandidate->resume);
                }
                $filePath = $request->file('resume')->store('resumes', 'public');
                $validatedData['resume'] = $filePath;
            }

            $jobCandidate->update($validatedData);

            return response()->json([
                'message' => 'Application updated successfully!',
                'data' => $jobCandidate,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $jobCandidate = JobCandidate::findOrFail($id);

            if ($jobCandidate->resume) {
                \Storage::disk('public')->delete($jobCandidate->resume);
            }

            $jobCandidate->delete();

            return response()->json([
                'message' => 'Application deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $jobCandidate = JobCandidate::with('job')->findOrFail($id);
            return response()->json([
                'data' => $jobCandidate,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}