<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class RepairRequest extends Model
{
    use HasApiTokens, HasFactory;

    protected $guarded = [];
    protected $casts = [
        'attachments' => 'array'
    ];
    // Returns the user who submitted this repair request.
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Returns all technicians assigned to this repair request.
    // This uses a pivot table (e.g., repair_requests_technician_assignments) for a many-to-many relationship.
    public function technicians()
    {
        return $this->belongsToMany(
            Technician::class,
            'repair_requests_technician_assignments',
            'repair_request_id',
            'technician_id'
        )->withTimestamps();
    }

    // (Optional) If a repair request has an associated time slot:
    public function timeSlot()
    {
        return $this->hasOne(BookedTimeSlot::class, 'repair_request_id');
    }

    // Returns the bill associated with this repair request.
    public function bill()
    {
        // Corrected foreign key: 'repair_request_id' (assuming your bills table has that column)
        return $this->hasOne(Bill::class, 'repair_request_id');
    }
}
