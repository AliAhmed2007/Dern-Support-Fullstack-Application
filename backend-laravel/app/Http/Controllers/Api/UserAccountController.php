<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;
use App\Enums\UserType;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Users",
 *     description="API Endpoints for managing users (Admin and self-service)"
 * )
 */
class UserAccountController extends Controller
{
    /**
     * Display a listing of users (Admin only).
     *
     * @OA\Get(
     *     path="/api/users",
     *     summary="Get all users",
     *     description="Retrieve a list of all users. (Admin only)",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of users",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/User")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function index(): JsonResponse
    {
        if (Auth::user()->user_type !== UserType::Admin->value) {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }
        $users = User::all();
        return response()->json(['data' => $users]);
    }

    /**
     * Store a newly created user (Admin only).
     *
     * @OA\Post(
     *     path="/api/users",
     *     summary="Create a new user",
     *     description="Create a new user account. (Admin only)",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="User details",
     *         @OA\JsonContent(ref="#/components/schemas/UserCreateRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="User created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request): JsonResponse
    {

        $request->validate([
            'firstName' => ['required', 'string', 'max:255', 'regex:/^[\pL\s]+$/u'], // Allows only letters and spaces
            'lastName' => ['required', 'string', 'max:255', 'regex:/^[\pL\s]+$/u'], // Allows only letters and spaces
            'email' => ['required', 'string', 'email', 'lowercase', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed'],
            'addressLine' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'phoneNumber' => ['required', 'numeric', 'digits_between:10,15', 'starts_with:+,0'],
            'userType' => ['required', Rule::in(['individual', 'business', 'admin', 'technician'])], // Ensures only allowed user types
            'businessName' => ['required_if:userType,business', 'nullable', 'string', 'max:255'], // Required only for businesses
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], // Limits file types and size
        ], [
            // Custom error messages
            'firstName.required' => 'The firstName field is required.',
            'firstName.string' => 'The firstName must be a valid string.',
            'firstName.max' => 'The firstName must not exceed 255 characters.',
            'firstName.regex' => 'The firstName can only contain letters and spaces.',
            'lastName.required' => 'The lastName field is required.',
            'lastName.string' => 'The lastName must be a valid string.',
            'lastName.max' => 'The lastName must not exceed 255 characters.',
            'lastName.regex' => 'The lastName can only contain letters and spaces.',
            'email.required' => 'The email field is required.',
            'email.string' => 'The email must be a valid string.',
            'email.lowercase' => 'The email must be in lowercase.',
            'email.max' => 'The email must not exceed 255 characters.',
            'email.unique' => 'This email is already taken.',

            'password.required' => 'The password field is required.',
            'password.confirmed' => 'The password confirmation does not match.',

            'address_line.required' => 'The address field is required.',
            'address_line.string' => 'The address must be a valid string.',
            'address_line.max' => 'The address must not exceed 255 characters.',

            'city.required' => 'The city field is required.',
            'city.string' => 'The city must be a valid string.',
            'city.max' => 'The city must not exceed 100 characters.',

            'state.required' => 'The state field is required.',
            'state.string' => 'The state must be a valid string.',
            'state.max' => 'The state must not exceed 100 characters.',

            'phoneNumber.required' => 'The phone number field is required.',
            'phoneNumber.numeric' => 'The phone number must contain only numbers.',
            'phoneNumber.digits_between' => 'The phone number must be between 10 and 15 digits.',
            'phoneNumber.starts_with' => 'The phone number must start with country code "+" or "0".',

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
            $user->save();
        }


        event(new Registered($user));

        $loginRequest = new LoginRequest();
        $loginRequest->merge([
            'email'    => $request->email,
            'password' => $request->password,
        ]);

        $authController = app()->make(AuthenticatedSessionController::class);
        $loginResponse = $authController->store($loginRequest);
        $loginData = json_decode($loginResponse->getContent(), true);

        return response()->json([
            'message'      => 'User created successfully',
            'user'         => $user,
            'access_token' => $loginData['access_token'],
            'token_type'   => $loginData['token_type']
        ], 201);
    }

    /**
     * Display the specified user.
     *
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Get user details",
     *     description="Retrieve the details of a specific user. A user may view their own account or an admin can view any account.",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User details",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized"),
     *     @OA\Response(response=404, description="User not found")
     * )
     */
    public function show(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        if (Auth::id() !== $user->id && Auth::user()->user_type !== UserType::Admin->value) {
            return response()->json([
                'message' => 'Unauthorized access to user data'
            ], 403);
        }
        return response()->json(['data' => $user]);
    }

    /**
     * Update the specified user.
     *
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Update a user",
     *     description="Update user account details. A user may update their own account or an admin can update any account.",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="User update data",
     *         @OA\JsonContent(ref="#/components/schemas/UserUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="User updated successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/User")
     *         )
     *     ),
     *     @OA\Response(response=403, description="Unauthorized"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);

        if (Auth::id() !== $user->id && Auth::user()->user_type !== UserType::Admin->value) {
            return response()->json([
                'message' => 'Unauthorized to update this user'
            ], 403);
        }

        $validated = $request->validate([
            'first_name'         => 'sometimes|string|max:255',
            'last_name'         => 'sometimes|string|max:255',
            'email'        => 'sometimes|email',
            'password'     => 'sometimes|string|min:8',
            'user_type'    => ['sometimes', new Enum(UserType::class)],
            'business_name' => 'required_if:user_type,business|nullable|string|max:255',
            'address_line' => 'sometimes|string|max:255',
            'city'         => 'sometimes|string|max:255',
            'state'        => 'sometimes|string|max:255',
            'avatar'       => 'nullable|image|max:2048'
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = asset("storage/$path");
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'data'    => $user
        ]);
    }

    /**
     * Remove the specified user (Admin only).
     *
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Delete a user",
     *     description="Delete the specified user. (Admin only)",
     *     tags={"Users"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="User deleted successfully"),
     *     @OA\Response(response=403, description="Unauthorized")
     * )
     */
    public function destroy(string $id): JsonResponse
    {
        if (Auth::user()->user_type !== UserType::Admin->value) {
            return response()->json([
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 204);
    }
}
