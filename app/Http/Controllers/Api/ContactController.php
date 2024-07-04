<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $contacts = Contact::where('user_id', auth()->user()->id)->filter($request->all())->paginate(1);
        return ContactResource::collection($contacts);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::id();
        $contact = Contact::create($data);
        return new ContactResource($contact);
    }

    public function show(Contact $contact)
    {
        $contact->where('user_id', Auth::id());
        return new ContactResource($contact);
    }

    public function update(Request $request, Contact $contact)
    {
        $contact->update($request->all());
        return new ContactResource($contact);
    }
}
