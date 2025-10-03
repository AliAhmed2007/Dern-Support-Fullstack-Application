<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {

        $request->validate([
            'firstName' => ['required', 'string', 'max:255'], // Allows only letters and spaces
            'lastName' => ['required', 'string', 'max:255'], // Allows only letters and spaces
            'email' => ['required', 'string', 'email', 'lowercase', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed'],
            'addressLine' => ['string', 'max:255'],
            'city' => ['string', 'max:100'],
            'state' => ['string', 'max:100'],
            'phoneNumber' => ['required', 'regex:/^(?:\+[\d-]{10,18}|0[\d-]{9,17})$/', 'digits_between:10,15', 'starts_with:+,0'],
            'userType' => ['required', Rule::in(['individual', 'business', 'admin', 'technician'])], // Ensures only allowed user types
            'businessName' => ['required_if:userType,business', 'nullable', 'string', 'max:255'], // Required only for businesses
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], // Limits file types and size
        ], [
            // Custom error messages
            'firstName.required' => 'The firstName field is required.',
            'firstName.string' => 'The firstName must be a valid string.',
            'firstName.max' => 'The firstName must not exceed 255 characters.',
            'lastName.required' => 'The lastName field is required.',
            'lastName.string' => 'The lastName must be a valid string.',
            'lastName.max' => 'The lastName must not exceed 255 characters.',
            'email.required' => 'The email field is required.',
            'email.string' => 'The email must be a valid string.',
            'email.lowercase' => 'The email must be in lowercase.',
            'email.max' => 'The email must not exceed 255 characters.',
            'email.unique' => 'This email is already taken.',

            'password.required' => 'The password field is required.',
            'password.confirmed' => 'The password confirmation does not match.',

            'address_line.string' => 'The address must be a valid string.',
            'address_line.max' => 'The address must not exceed 255 characters.',

            'city.string' => 'The city must be a valid string.',
            'city.max' => 'The city must not exceed 100 characters.',

            'state.string' => 'The state must be a valid string.',
            'state.max' => 'The state must not exceed 100 characters.',

            'phoneNumber.required' => 'The phone number field is required.',
            'phoneNumber.digits_between' => 'The phone number must be between 10 and 15 digits.',
            'phoneNumber.starts_with' => 'The phone number must start with country code "+" or "0".',
            'phoneNumber.regex' => 'The phone number must start with a + followed by 10 to 18 digits or hyphens, or with 0 followed by 9 to 17 digits or hyphens.',

            'userType.required' => 'The user type field is required.',
            'userType.in' => 'The selected user type is invalid.',

            'businessName.required_if' => 'The business name is required for business users.',
            'businessName.string' => 'The business name must be a valid string.',
            'businessName.max' => 'The business name must not exceed 255 characters.',

            'avatar.image' => 'The avatar must be an image file.',
            'avatar.mimes' => 'The avatar must be a file of type: jpg, jpeg, png, webp.',
            'avatar.max' => 'The avatar must not exceed 2MB in size.',
        ]);

        $user = User::create([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'address_line' => $request->addressLine,
            'city' => $request->city,
            'state' => $request->state,
            'phone_number' => $request->phoneNumber,
            'user_type' => $request->userType,
            'business_name' => $request->userType === 'business' ? $request->businessName : null, // Only set if business
        ]);

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public'); // Stores in storage/app/public/avatars
            $user->avatar = $avatarPath;
        } 
        
        $user->save();

        event(new Registered($user));

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'user_id' => $user->id,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }
}
