<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Technician extends Model
{
    use HasApiTokens, HasFactory;

    protected $guarded = [];

    /**
     * Get all repair requests assigned to this technician.
     *
     * @return BelongsToMany
     */
    public function repairRequests(): BelongsToMany
    {
        return $this->belongsToMany(
            RepairRequest::class,
            'repair_requests_technician_assignments',
            'technician_id',
            'repair_request_id'
        )->withTimestamps();
    }

    /**
     * Get the user information associated with this technician.
     *
     * @return BelongsTo
     */
    public function userInfo(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all booked time slots associated with this technician.
     *
     * @return HasMany
     */
    public function timeSlots(): HasMany
    {
        return $this->hasMany(BookedTimeSlot::class, 'technician_id');
    }
}
