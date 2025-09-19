<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    // Get all FAQs
    public function index()
    {
        return FAQ::all();
    }

    // Store a new FAQ
    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        return FAQ::create($request->all());
    }

    // Show a specific FAQ
    public function show($id)
    {
        $faq = FAQ::find($id);
        if (!$faq) {
            return response()->json(['message' => 'FAQ not found'], 404);
        }
        return $faq;
    }

    // Update an FAQ
    public function update(Request $request, $id)
    {
        $faq = FAQ::find($id);
        if (!$faq) {
            return response()->json(['message' => 'FAQ not found'], 404);
        }

        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq->update($request->all());
        return $faq;
    }

    // Delete an FAQ
    public function destroy($id)
    {
        $faq = FAQ::find($id);
        if (!$faq) {
            return response()->json(['message' => 'FAQ not found'], 404);
        }

        $faq->delete();
        return response()->json(['message' => 'FAQ deleted successfully']);
    }
}