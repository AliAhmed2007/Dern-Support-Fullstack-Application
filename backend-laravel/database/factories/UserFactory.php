<?php

namespace Database\Factories;

use App\Models\Technician;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Static list of available technician avatars.
     * Once an avatar is used, it is removed from this list.
     */
    protected static array $availableTechnicianAvatars = [
        'tech1.png',
        'tech2.png',
        'tech3.png',
        'tech4.png',
        'tech5.png',
        'tech6.png',
        'tech7.png'
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userType = fake()->randomElement(['individual', 'business', 'admin', 'technician']);

        return [
            'first_name'        => fake()->firstName(),
            'last_name'         => fake()->lastName(),
            'email'             => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'          => static::$password ??= Hash::make('password'),
            'remember_token'    => Str::random(10),
            'address_line'      => fake()->streetAddress(),
            'phone_number'      => fake()->phoneNumber(),
            'city'              => fake()->city(),
            'state'             => fake()->state(),
            'business_name'     => $userType === 'business' ? fake()->company() : null,
            'user_type'         => $userType,
            'avatar'            => null,
            'created_at'        => $createdAt = fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at'        => fake()->dateTimeBetween($createdAt, 'now'),
        ];
    }

    /**
     * Configure the factory.
     */
    public function configure()
    {
        return $this->afterCreating(function (User $user) {
            if ($user->user_type === 'technician') {
                // Ensure that an available avatar exists
                if (!empty(self::$availableTechnicianAvatars)) {
                    // Select a random key from the available avatars array
                    $randomKey = array_rand(self::$availableTechnicianAvatars);
                    $avatarFileName = self::$availableTechnicianAvatars[$randomKey];
                    // Remove the selected avatar to enforce uniqueness
                    unset(self::$availableTechnicianAvatars[$randomKey]);
                    // Re-index the array (optional)
                    self::$availableTechnicianAvatars = array_values(self::$availableTechnicianAvatars);
                } else {
                    // Optionally throw an exception or assign a default fallback if all avatars have been used
                    // For example:
                    // throw new \Exception("No more unique technician avatars available.");
                    $avatarFileName = 'default_tech.png';
                }

                $avatarPath = asset('storage/avatars/' . $avatarFileName);

                Technician::create([
                    'user_id'        => $user->id,
                    'name'           => $user->first_name . ' ' . $user->last_name,
                    'city'           => $user->city,
                    'email'          => $user->email,
                    'password'       => $user->password,
                    'phone_number'   => $user->phone_number,
                    'specialization' => fake()->randomElement(['hardware', 'software']),
                    'rating'         => fake()->randomFloat(1, 3, 5),
                    'status'         => fake()->randomElement(['available', 'unavailable', 'booked']),
                    'avatar'         => $avatarPath,
                ]);
            }
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
