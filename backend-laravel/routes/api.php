<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserAccountController;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\RepairRequestController;
use App\Http\Controllers\API\TechnicianController;
use App\Http\Controllers\API\BillController;
use App\Http\Controllers\API\BookedTimeSlotController;
use App\Http\Controllers\API\PlanSubscriptionController;
use App\Http\Controllers\API\PlanController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/{user}', [UserAccountController::class, 'show']);
    Route::put('/users/{user}', [UserAccountController::class, 'update']);
    Route::get('user/tickets', [TicketController::class, 'userRelatedTickets'])->name('user.tickets');
    Route::apiResource('tickets', TicketController::class);
    Route::patch('tickets/{ticket}/status', [TicketController::class, 'updateStatus']);
    Route::apiResource('repair-requests', RepairRequestController::class)->except(['update', 'destroy']);
    Route::get('/devices', [RepairRequestController::class, 'fetchDevices']);
    Route::get('/devices/{device}', [RepairRequestController::class, 'fetchDeviceById']);
    Route::get('/devices/{device}/general-problems', [RepairRequestController::class, 'fetchTopics']);
    Route::get('/general-problems/{generalProblem}', [RepairRequestController::class, 'fetchGeneralProblemId']);
    Route::get('/general-problems/{generalProblem}/specific-problems', [RepairRequestController::class, 'fetchSpecificProblems']);
    Route::get('/technicians', [TechnicianController::class, 'index']);
    Route::get('/technicians/{technician}', [TechnicianController::class, 'show']);
    Route::get('/booked-slots', [BookedTimeSlotController::class, 'index']);
    Route::get('/booked-slots/{bookedTimeSlot}', [BookedTimeSlotController::class, 'show']);
    Route::get('/bills', [BillController::class, 'index']);
    Route::get('/bills/{bill}', [BillController::class, 'show']);
    Route::apiResource('plan-subscriptions', PlanSubscriptionController::class);
    Route::get('plans', [PlanController::class, 'index']);
    Route::get('plans/{plan}', [PlanController::class, 'show']);

    // Admin-Only Routes
    Route::middleware('admin')->group(function () {
        Route::get('/users', [UserAccountController::class, 'index']);
        Route::delete('/users/{user}', [UserAccountController::class, 'destroy']);
        Route::delete('/repair-requests/{repairRequest}', [RepairRequestController::class, 'destroy']);
        Route::post('/repair-requests/{repairRequest}/assign', [RepairRequestController::class, 'assignTechnician']);
        Route::patch('/repair-requests/{repairRequest}/status', [RepairRequestController::class, 'updateStatus']);
        Route::put('/repair-requests/{repairRequest}', [RepairRequestController::class, 'update']);
        Route::post('/technicians', [TechnicianController::class, 'store']);
        Route::put('/technicians/{technician}', [TechnicianController::class, 'update']);
        Route::delete('/technicians/{technician}', [TechnicianController::class, 'destroy']);
        Route::post('/booked-slots', [BookedTimeSlotController::class, 'store']);
        Route::put('/booked-slots/{bookedTimeSlot}', [BookedTimeSlotController::class, 'update']);
        Route::delete('/booked-slots/{bookedTimeSlot}', [BookedTimeSlotController::class, 'destroy']);
        Route::post('/bills', [BillController::class, 'store']);
        Route::put('/bills/{bill}', [BillController::class, 'update']);
        Route::delete('/bills/{bill}', [BillController::class, 'destroy']);
        Route::post('/bills/{bill}/courier', [BillController::class, 'addCourierFee']);
    });
});

Route::get('/avatars/{filename}', function ($filename) {
    $path = storage_path('app/public/avatars/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $mimeType = File::mimeType($path);

    return Response::make($file, 200)->header("Content-Type", $mimeType);
})->name('avatar.show');
