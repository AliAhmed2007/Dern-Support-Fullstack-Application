<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpecificProblem extends Model
{
    protected $guarded = [];

    public function generalProblem() {
       return $this->belongsTo(GeneralProblem::class);
    }
}
