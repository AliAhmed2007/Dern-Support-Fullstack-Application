<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralProblem extends Model
{
    protected $guarded = [];

    public function specificProblems()
    {
        return $this->hasMany(SpecificProblem::class);
    }

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}
