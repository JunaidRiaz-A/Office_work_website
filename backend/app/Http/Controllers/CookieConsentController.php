<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CookieConsent;

class CookieConsentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'consent' => 'required|in:accepted,rejected',
            'userAgent' => 'nullable|string',
            'url' => 'nullable|url',
        ]);

        CookieConsent::create([
            'consent' => $request->input('consent'),
            'user_agent' => $request->input('userAgent'),
            'page_url' => $request->input('url'),
        ]);

        return response()->json(['message' => 'Consent saved successfully.'], 201);
    }
}
