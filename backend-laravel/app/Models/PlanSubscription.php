<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanSubscription extends Model
{
    use HasFactory, HasApiTokens;

    protected $guarded = [];

    /**
     * Get the user that owns this subscription.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the plan associated with this subscription.
     *
     * @return BelongsTo
     */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    /**
     * Determine if the subscription is for the Basic plan.
     *
     * @return bool
     */
    public function isBasic(): bool
    {
        return $this->plan && $this->plan->name === 'basic';
    }

    /**
     * Determine if the subscription is for the Premium plan.
     *
     * @return bool
     */
    public function isPremium(): bool
    {
        return $this->plan && $this->plan->name === 'premium';
    }

    /**
     * Determine if the subscription is for the Business plan.
     *
     * @return bool
     */
    public function isBusiness(): bool
    {
        return $this->plan && $this->plan->name === 'business';
    }

    /**
     * Check if the subscription is monthly.
     *
     * @return bool
     */
    public function isMonthly(): bool
    {
        return $this->type === 'monthly';
    }

    /**
     * Check if the subscription is annual.
     *
     * @return bool
     */
    public function isAnnual(): bool
    {
        return $this->type === 'annual';
    }
}
