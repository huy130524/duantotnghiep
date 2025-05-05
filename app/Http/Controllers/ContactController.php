<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }
    public function store(Request $request)
    {
        $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:15',
            'contact' => 'nullable|string',
        ]);

        $contact = Contact::create($request->all());

        return response()->json([
            'message' => 'Liên hệ đã được thêm thành công!',
            'data' => $contact
        ], 201);
    }

    // Lấy chi tiết liên hệ theo ID
    public function show($id)
    {
        $contact = Contact::findOrFail($id);
        return response()->json($contact);
    }

    // Cập nhật liên hệ
    public function update(Request $request, $id)
    {
        $request->validate([
            'fullname' => 'string|max:255',
            'email' => 'email|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:15',
            'contact' => 'nullable|string',
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update($request->all());

        return response()->json([
            'message' => 'Cập nhật liên hệ thành công!',
            'data' => $contact
        ]);
    }

    // Xóa liên hệ (soft delete)
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Liên hệ đã được xóa thành công!']);
    }

}
