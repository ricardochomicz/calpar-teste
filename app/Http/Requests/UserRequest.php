<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ];
        if ($this->method() === 'PUT') {
            $rules['password'] = 'nullable';
        }

        return $rules;
    }

    public function messages(): array
    {
       return [
           'name.required' => 'Informe um nome',
           'email.required' => 'Informe um email',
       ];
    }
}
