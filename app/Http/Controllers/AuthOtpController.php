<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthOtpController extends Controller
{
    public function generate(Request $request)
    {
        # Validate Data
        $request->validate([
            'mobile_no' => 'required|exists:users,mobile_no'
        ]);

        # Generate An OTP
        $verificationCode = $this->generateOtp($request->mobile_no);

        $message = "Your OTP To Login is - ".$verificationCode->otp;
        # Return With OTP 

        return redirect()->route('otp.verification', ['user_id' => $verificationCode->user_id])->with('success',  $message); 
    }

    public function generateOtp($mobile_no)
    {
        $user = User::where('mobile_no', $mobile_no)->first();

        # User Does not Have Any Existing OTP
        $verificationCode = VerificationCode::where('user_id', $user->id)->latest()->first();

        $now = Carbon::now();

        if($verificationCode && $now->isBefore($verificationCode->expire_at)){
            return $verificationCode;
        }

        // Create a New OTP
        return VerificationCode::create([
            'user_id' => $user->id,
            'otp' => rand(123456, 999999),
            'expire_at' => Carbon::now()->addMinutes(10)
        ]);
    }
    
    public function loginWithOtp(Request $request)
    {
        #Validation
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'otp' => 'required'
        ]);

        #Validation Logic
        $verificationCode   = VerificationCode::where('user_id', $request->user_id)->where('otp', $request->otp)->first();

        $now = Carbon::now();
        if (!$verificationCode) {
            return redirect()->back()->with('error', 'Your OTP is not correct');
        }elseif($verificationCode && $now->isAfter($verificationCode->expire_at)){
            return redirect()->route('otp.login')->with('error', 'Your OTP has been expired');
        }

        $user = User::whereId($request->user_id)->first();

        if($user){
            // Expire The OTP
            $verificationCode->update([
                'expire_at' => Carbon::now()
            ]);

            Auth::login($user);

            return redirect('/home');
        }
    }
}
