<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    public function index()
    {
        return TeamMember::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
        ]);

        $teamMember = TeamMember::create($request->only(['name', 'role']));

        if (!$teamMember) {
            return response()->json(['message' => 'Failed to create team member'], 500);
        }

        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            $teamMember->photo = $imageName;
            $teamMember->save();
        }

        return response()->json($teamMember, 201);
    }

    public function show($id)
    {
        return TeamMember::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $teamMember = TeamMember::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'role' => 'sometimes|required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
        ]);

        $data = $request->only(['name', 'role']);
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images'), $imageName);
            $data['photo'] = $imageName;
            // Delete old photo if it exists
            if ($teamMember->photo && file_exists(public_path('images/' . $teamMember->photo))) {
                unlink(public_path('images/' . $teamMember->photo));
            }
        } else {
            // Preserve existing photo if no new one is uploaded
            $data['photo'] = $teamMember->photo;
        }

        $teamMember->update($data);
        return response()->json($teamMember);
    }

    public function destroy($id)
    {
        $teamMember = TeamMember::findOrFail($id);
        if ($teamMember->photo && file_exists(public_path('images/' . $teamMember->photo))) {
            unlink(public_path('images/' . $teamMember->photo));
        }
        $teamMember->delete();
        return response()->json(null, 204);
    }
}