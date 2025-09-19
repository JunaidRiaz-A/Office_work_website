<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;

class JobController extends Controller
{
    // List all jobs with related candidates
    public function index()
    {
        return Job::with('jobCandidates')->get();
    }

    // Store a new job
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jobPostName' => 'required|max:255',
            'jobType' => 'required',
            'location' => 'required',
            'salary' => 'nullable|numeric',
            'description' => 'required',
            'requirement' => 'required',
            'skillsExperience' => 'nullable',
            'category' => 'required',
            'expiryDate' => 'required|date',
            'experienceForJob' => 'required',
            'gender' => 'nullable',
            'qualification' => 'required',
            'date_posted' => 'required|date',
        ]);

        $job = Job::create([
            'title' => $validated['jobPostName'],
            'mode' => $validated['jobType'],
            'location' => $validated['location'],
            'salary' => $validated['salary'],
            'description' => $validated['description'],
            'requirements' => $validated['requirement'],
            'skills' => $validated['skillsExperience'],
            'category' => $validated['category'],
            'expiry_date' => $validated['expiryDate'],
            'experience' => $validated['experienceForJob'],
            'gender' => $validated['gender'],
            'qualification' => $validated['qualification'],
            'date_posted' => $validated['date_posted'],
            'offered_salary' => $validated['salary'], // Map salary to offered_salary if needed
        ]);

        return response()->json($job, 201);
    }

    // Show a specific job
    public function show($id)
    {
        return Job::findOrFail($id);
    }

    // Update a job
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $validated = $request->validate([
            'jobPostName' => 'required|max:255',
            'jobType' => 'required',
            'location' => 'required',
            'salary' => 'nullable|numeric',
            'description' => 'required',
            'requirement' => 'required',
            'skillsExperience' => 'nullable',
            'category' => 'required',
            'expiryDate' => 'required|date',
            'experienceForJob' => 'required',
            'gender' => 'nullable',
            'qualification' => 'required',
            'date_posted' => 'required|date',
        ]);

        $job->update([
            'title' => $validated['jobPostName'],
            'mode' => $validated['jobType'],
            'location' => $validated['location'],
            'salary' => $validated['salary'],
            'description' => $validated['description'],
            'requirements' => $validated['requirement'],
            'skills' => $validated['skillsExperience'],
            'category' => $validated['category'],
            'expiry_date' => $validated['expiryDate'],
            'experience' => $validated['experienceForJob'],
            'gender' => $validated['gender'],
            'qualification' => $validated['qualification'],
            'date_posted' => $validated['date_posted'],
            'offered_salary' => $validated['salary'], // Map salary to offered_salary if needed
        ]);

        return response()->json($job, 200);
    }

    // Delete a job
    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->json(null, 204);
    }
}