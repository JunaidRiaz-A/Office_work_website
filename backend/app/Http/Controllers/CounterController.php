<?php

namespace App\Http\Controllers;

use App\Models\Counter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CounterController extends Controller
{
    public function index()
    {
        try {
            $counters = Counter::all();
            Log::info('Fetching all counters', ['count' => $counters->count()]);

            if ($counters->isEmpty()) {
                Log::warning('No counters found in the database');
                return response()->json([
                    'message' => 'No counters found',
                    'data' => [],
                ], 200);
            }

            return response()->json([
                'message' => 'Counters retrieved successfully',
                'data' => $counters,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching counters', ['exception' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error fetching counters: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'smart_solutions' => 'required|integer',
                'satisfied_clients' => 'required|integer',
                'it_specialists' => 'required|integer',
                'projects_completed' => 'required|integer',
            ]);

            $counter = Counter::create([
                'smart_solutions' => $validatedData['smart_solutions'],
                'satisfied_clients' => $validatedData['satisfied_clients'],
                'it_specialists' => $validatedData['it_specialists'], // Fixed: Use validated data
                'projects_completed' => $validatedData['projects_completed'],
            ]);

            return response()->json([
                'message' => 'Counter created successfully',
                'data' => $counter,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating counter', ['exception' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error creating counter: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        Log::info("Update request received for ID: $id", ['data' => $request->all()]);

        try {
            $validatedData = $request->validate([
                'smart_solutions' => 'required|integer',
                'satisfied_clients' => 'required|integer',
                'it_specialists' => 'required|integer',
                'projects_completed' => 'required|integer',
            ]);

            $counter = Counter::findOrFail($id);
            Log::info("Counter found: ", ['counter' => $counter]);

            $counter->update($validatedData);
            Log::info("Counter updated successfully");

            return response()->json([
                'message' => 'Counter updated successfully',
                'data' => $counter,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error("Validation failed", ['errors' => $e->errors()]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error("Counter not found", ['id' => $id]);
            return response()->json([
                'message' => 'Counter not found',
            ], 404);
        } catch (\Exception $e) {
            Log::error("Error updating counter", ['exception' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error updating counter: ' . $e->getMessage(),
            ], 500);
        }
    }
}