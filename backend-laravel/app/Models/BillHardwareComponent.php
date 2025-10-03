<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class BillHardwareComponent extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = ['bill_id', 'component_name', 'quantity', 'unit_price', 'subtotal'];

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }
}
