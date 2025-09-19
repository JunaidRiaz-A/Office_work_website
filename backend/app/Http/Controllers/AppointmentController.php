<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    public function index()
    {
        try {
            $appointments = Appointment::orderBy('created_at', 'desc')->paginate(10);
            return response()->json($appointments, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching appointments: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone_number' => 'required|string',
                'website' => 'nullable|url',
                'date_selected' => 'required|date',
                'check' => 'boolean', // Added validation for check field
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }

            $appointment = Appointment::create($request->all());
            return response()->json(['message' => 'Appointment created successfully', 'appointment' => $appointment], 201);
        } catch (\Exception $e) {
            Log::error('Error creating appointment: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function show($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            return response()->json($appointment, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching appointment: ' . $e->getMessage());
            return response()->json(['error' => 'Appointment not found'], 404);
        }
    }

    public function update(Request $request, $id)
       {
           try {
               $appointment = Appointment::findOrFail($id);

               $validator = Validator::make($request->all(), [
                   'name' => 'sometimes|required|string|max:255', // 'sometimes' makes it optional if not provided
                   'email' => 'sometimes|required|email',
                   'phone_number' => 'sometimes|required|string',
                   'website' => 'nullable|url',
                   'date_selected' => 'sometimes|required|date',
                   'check' => 'boolean|nullable', // Allow check to be optional
               ]);

               if ($validator->fails()) {
                   return response()->json(['error' => $validator->errors()], 422);
               }

               $appointment->update($request->all());
               return response()->json(['message' => 'Appointment updated successfully', 'appointment' => $appointment], 200);
           } catch (\Exception $e) {
               Log::error('Error updating appointment: ' . $e->getMessage());
               return response()->json(['error' => 'Something went wrong'], 500);
           }
       }

    public function destroy($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->delete();
            return response()->json(['message' => 'Appointment deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting appointment: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}