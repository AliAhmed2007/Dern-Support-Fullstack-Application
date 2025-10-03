<?php

namespace App\Enums;

enum UserType: string
{
    case Individual = 'individual';
    case Business = 'business';
    case Admin = 'admin';
    case Technician = 'technician';
}
