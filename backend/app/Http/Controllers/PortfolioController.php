<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        return Portfolio::all();
    }

    public function store(Request $request)
    {
        try {
            // Validate incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:10048',
                'portfolio_category' => 'required|array',
            ]);
    
            // Debugging: Print received request data
            \Log::info('Request Data: ', $request->all());
    
            // Handle image upload
            if ($request->hasFile('image')) {
                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images/portfolio'), $imageName);
                $imagePath = 'images/portfolio/' . $imageName;
            } else {
                return response()->json(['message' => 'No image uploaded.'], 400);
            }
    
            // Prepare the data for the new portfolio entry
            $portfolioData = $request->all();
            $portfolioData['portfolio_category'] = json_encode($request->portfolio_category);
            $portfolioData['image'] = $imagePath;
    
            // Create a new portfolio entry
            $portfolio = Portfolio::create($portfolioData);
    
            return response()->json($portfolio, 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation errors', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
    
    public function show($id)
    {
        return Portfolio::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        try {
            $portfolio = Portfolio::findOrFail($id);

            // Validate incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:10048', 
                'portfolio_category' => 'required|array',
            ]);

            // Prepare the data for updating
            $portfolioData = $request->all();
            $portfolioData['portfolio_category'] = json_encode($portfolioData['portfolio_category']);

            // Handle image upload if a new image is provided
            if ($request->hasFile('image')) {
                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images/portfolio'), $imageName);
                $portfolioData['image'] = 'images/portfolio/' . $imageName;

                // Optionally delete the old image if it exists
                if ($portfolio->image && file_exists(public_path($portfolio->image))) {
                    unlink(public_path($portfolio->image));
                }
            } else {
                // Retain the existing image path if no new image is uploaded
                $portfolioData['image'] = $portfolio->image;
            }

            // Update the portfolio entry
            $portfolio->update($portfolioData);
            return response()->json($portfolio, 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation errors', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        if ($portfolio->image && file_exists(public_path($portfolio->image))) {
            unlink(public_path($portfolio->image));
        }
        $portfolio->delete();
        return response()->json(null, 204);
    }
}