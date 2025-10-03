<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairRequestTechnicianAssignment extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'repair_requests_technician_assignments';

    protected $fillable = ['repair_request_id', 'technician_id', 'assigned_at'];

    public $timestamps = false;

    /**
     * Get the repair request for this assignment.
     *
     * @return BelongsTo
     */
    public function repairRequest(): BelongsTo
    {
        return $this->belongsTo(RepairRequest::class);
    }

    /**
     * Get the technician for this assignment.
     *
     * @return BelongsTo
     */
    public function technician(): BelongsTo
    {
        return $this->belongsTo(Technician::class);
    }
}
