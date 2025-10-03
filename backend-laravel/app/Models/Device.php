<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = ['name', 'category', 'user_type'];

    public function generalProblems() {
        return $this->hasMany(GeneralProblem::class);
    }
}
