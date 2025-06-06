<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $table = 'user_addresses';

    protected $fillable = [
        'title',
        'user_id',
        'address_id',
        'type',
        'mobile',
        'alt_mobile'
    ];
}
