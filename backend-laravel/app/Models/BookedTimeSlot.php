<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class BookedTimeSlot extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'booked_time_slots';

    protected $fillable = [
        'technician_id',
        'repair_request_id',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date'   => 'datetime',
    ];

    /**
     * Get the technician associated with this time slot.
     *
     * @return BelongsTo
     */
    public function technician(): BelongsTo
    {
        return $this->belongsTo(Technician::class);
    }

    /**
     * Get the associated repair request, excluding those that are completed or cancelled.
     *
     * @return BelongsTo
     */
    public function repairRequest(): BelongsTo
    {
        return $this->belongsTo(RepairRequest::class)
            ->whereNotIn('status', ['completed', 'cancelled']);
    }

    /**
     * Scope a query to only include active booked time slots.
     *
     * @param  Builder  $query
     * @return Builder
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->whereHas('repairRequest', function (Builder $q) {
            $q->whereNotIn('status', ['completed', 'cancelled']);
        });
    }
}
