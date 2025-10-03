<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use OpenApi\Annotations as OA;
class Bill extends Model
{
    use HasFactory, HasApiTokens;

    protected $guarded = [];

    // Returns the user associated with this bill.
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Returns the repair request associated with this bill.
    public function repairRequest()
    {
        return $this->belongsTo(RepairRequest::class, 'repair_request_id');
    }

    // Returns all hardware components associated with this bill.
    public function billHardwareComponents()
    {
        return $this->hasMany(BillHardwareComponent::class);
    }
}
