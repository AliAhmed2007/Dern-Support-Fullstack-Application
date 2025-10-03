<?php

namespace App\Swagger;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Technician",
 *     type="object",
 *     title="Technician",
 *     required={"id", "name", "email", "phone_number", "specialization", "status"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="phone_number", type="string"),
 *     @OA\Property(property="specialization", type="string", enum={"hardware","software"}),
 *     @OA\Property(property="status", type="string", enum={"booked","unavailable","available"}),
 *     @OA\Property(property="avatar", type="string", nullable=true)
 * )
 *
 * @OA\Schema(
 *     schema="TechnicianCreateRequest",
 *     type="object",
 *     required={"name", "email", "phone_number", "specialization", "status"},
 *     @OA\Property(property="name", type="string", maxLength=255),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="phone_number", type="string", maxLength=20),
 *     @OA\Property(property="specialization", type="string", enum={"hardware","software"}),
 *     @OA\Property(property="status", type="string", enum={"booked","unavailable","available"}),
 *     @OA\Property(property="avatar", type="string", format="binary", nullable=true)
 * )
 *
 * @OA\Schema(
 *     schema="TechnicianUpdateRequest",
 *     type="object",
 *     @OA\Property(property="name", type="string", maxLength=255),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="phone_number", type="string", maxLength=20),
 *     @OA\Property(property="specialization", type="string", enum={"hardware","software"}),
 *     @OA\Property(property="status", type="string", enum={"booked","unavailable","available"}),
 *     @OA\Property(property="avatar", type="string", format="binary", nullable=true)
 * )
 * 
 * @OA\Schema(
 *     schema="RepairRequest",
 *     type="object",
 *     title="RepairRequest",
 *     required={"id", "description", "status"},
 *     @OA\Property(property="id", type="integer", format="int64", example=1),
 *     @OA\Property(property="description", type="string", example="Device not working"),
 *     @OA\Property(property="status", type="string", example="pending")
 * )
 * 
 * @OA\Schema(
 *     schema="Ticket",
 *     type="object",
 *     title="Ticket",
 *     required={"id", "user_id", "description", "ticket_type", "status"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="user_id", type="integer", format="int64"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="ticket_type", type="string", enum={"repair request","general inquiry","problem reporting"}),
 *     @OA\Property(property="status", type="string", enum={"in progress","cancelled","resolved"}),
 *     @OA\Property(property="controlled_by", type="integer", format="int64", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 *
 * @OA\Schema(
 *     schema="TicketCreateRequest",
 *     type="object",
 *     required={"description", "ticket_type"},
 *     @OA\Property(property="description", type="string", maxLength=255),
 *     @OA\Property(property="ticket_type", type="string", enum={"repair request","general inquiry","problem reporting"}),
 *     @OA\Property(property="status", type="string", enum={"in progress","cancelled","resolved"}, default="in progress")
 * )
 *
 * @OA\Schema(
 *     schema="TicketUpdateRequest",
 *     type="object",
 *     @OA\Property(property="description", type="string", maxLength=255),
 *     @OA\Property(property="ticket_type", type="string", enum={"repair request","general inquiry","problem reporting"}),
 *     @OA\Property(property="status", type="string", enum={"in progress","cancelled","resolved"}),
 *     @OA\Property(property="controlled_by", type="integer", format="int64", nullable=true),
 *     @OA\Property(property="repair_request_id", type="integer", format="int64", nullable=true)
 * )
 *
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     required={"id", "name", "email", "user_type", "address_line", "city", "state"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="user_type", type="string"),
 *     @OA\Property(property="business_name", type="string", nullable=true),
 *     @OA\Property(property="address_line", type="string"),
 *     @OA\Property(property="city", type="string"),
 *     @OA\Property(property="state", type="string"),
 *     @OA\Property(property="avatar", type="string", nullable=true)
 * )
 *
 * @OA\Schema(
 *     schema="UserCreateRequest",
 *     type="object",
 *     required={"name", "email", "password", "user_type", "address_line", "city", "state"},
 *     @OA\Property(property="name", type="string", maxLength=255),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="password", type="string", minLength=8),
 *     @OA\Property(property="user_type", type="string"),
 *     @OA\Property(property="business_name", type="string", nullable=true),
 *     @OA\Property(property="address_line", type="string"),
 *     @OA\Property(property="city", type="string"),
 *     @OA\Property(property="state", type="string"),
 *     @OA\Property(property="avatar", type="string", format="binary", nullable=true)
 * )
 *
 * @OA\Schema(
 *     schema="UserUpdateRequest",
 *     type="object",
 *     @OA\Property(property="name", type="string", maxLength=255),
 *     @OA\Property(property="email", type="string", format="email"),
 *     @OA\Property(property="password", type="string", minLength=8),
 *     @OA\Property(property="user_type", type="string"),
 *     @OA\Property(property="business_name", type="string", nullable=true),
 *     @OA\Property(property="address_line", type="string"),
 *     @OA\Property(property="city", type="string"),
 *     @OA\Property(property="state", type="string"),
 *     @OA\Property(property="avatar", type="string", format="binary", nullable=true)
 * )
 *
 * @OA\Schema(
 *     schema="Bill",
 *     type="object",
 *     title="Bill",
 *     required={"id", "bill_number", "user_id", "service_amount", "final_amount"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="bill_number", type="string"),
 *     @OA\Property(property="user_id", type="integer", format="int64"),
 *     @OA\Property(property="repair_request_id", type="integer", format="int64", nullable=true),
 *     @OA\Property(property="service_amount", type="number", format="float"),
 *     @OA\Property(property="tax_amount", type="number", format="float", nullable=true),
 *     @OA\Property(property="discount", type="number", format="float", nullable=true),
 *     @OA\Property(property="courier_amount", type="number", format="float", nullable=true),
 *     @OA\Property(property="final_amount", type="number", format="float"),
 *     @OA\Property(property="payment_method", type="string", nullable=true),
 *     @OA\Property(property="due_date", type="string", format="date", nullable=true),
 *     @OA\Property(property="status", type="string", nullable=true),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 *
 * @OA\Schema(
 *     schema="BillCreateRequest",
 *     type="object",
 *     required={"user_id", "service_amount"},
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="repair_request_id", type="integer", nullable=true, example=2),
 *     @OA\Property(property="service_amount", type="number", format="float", example=100.00),
 *     @OA\Property(property="tax_amount", type="number", format="float", nullable=true, example=5.00),
 *     @OA\Property(property="discount", type="number", format="float", nullable=true, example=2.00),
 *     @OA\Property(property="courier_amount", type="number", format="float", nullable=true, example=10.00),
 *     @OA\Property(property="payment_method", type="string", nullable=true, example="cash"),
 *     @OA\Property(property="due_date", type="string", format="date", nullable=true, example="2025-12-31"),
 *     @OA\Property(
 *         property="hardware_components",
 *         type="array",
 *         nullable=true,
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="component_name", type="string", example="RAM"),
 *             @OA\Property(property="quantity", type="integer", example=2),
 *             @OA\Property(property="unit_price", type="number", format="float", example=50.00)
 *         )
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="BillUpdateRequest",
 *     type="object",
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="repair_request_id", type="integer", nullable=true, example=2),
 *     @OA\Property(property="service_amount", type="number", format="float", example=150.00, nullable=true),
 *     @OA\Property(property="tax_amount", type="number", format="float", example=7.50, nullable=true),
 *     @OA\Property(property="discount", type="number", format="float", example=3.00, nullable=true),
 *     @OA\Property(property="courier_amount", type="number", format="float", example=12.00, nullable=true),
 *     @OA\Property(property="status", type="string", example="paid", nullable=true),
 *     @OA\Property(property="payment_method", type="string", example="credit_card", nullable=true),
 *     @OA\Property(property="due_date", type="string", format="date", example="2025-12-31", nullable=true),
 *     @OA\Property(
 *         property="hardware_components",
 *         type="array",
 *         nullable=true,
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1, nullable=true),
 *             @OA\Property(property="component_name", type="string", example="SSD", nullable=true),
 *             @OA\Property(property="quantity", type="integer", example=1, nullable=true),
 *             @OA\Property(property="unit_price", type="number", format="float", example=100.00, nullable=true)
 *         )
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="BookedTimeSlot",
 *     type="object",
 *     title="BookedTimeSlot",
 *     required={"id", "start_time", "end_time"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="start_time", type="string", format="date-time"),
 *     @OA\Property(property="end_time", type="string", format="date-time")
 * )
 *
 * @OA\Schema(
 *     schema="BookedTimeSlotUpdate",
 *     type="object",
 *     @OA\Property(property="start_time", type="string", format="date-time"),
 *     @OA\Property(property="end_time", type="string", format="date-time"),
 *     @OA\Property(property="status", type="string", enum={"booked", "cancelled"})
 * )
 *
 * @OA\Schema(
 *     schema="Plan",
 *     type="object",
 *     title="Plan",
 *     required={"id", "name", "monthly_price", "annually_price"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="monthly_price", type="number", format="float"),
 *     @OA\Property(property="annually_price", type="number", format="float")
 * )
 *
 * @OA\Schema(
 *     schema="PlanSubscription",
 *     type="object",
 *     title="PlanSubscription",
 *     required={"id", "user_id", "plan_id", "type", "price", "start_date", "expiry_date", "status"},
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="user_id", type="integer", format="int64"),
 *     @OA\Property(property="plan_id", type="integer", format="int64"),
 *     @OA\Property(property="type", type="string", enum={"monthly", "annually"}),
 *     @OA\Property(property="price", type="number", format="float"),
 *     @OA\Property(property="start_date", type="string", format="date-time"),
 *     @OA\Property(property="expiry_date", type="string", format="date-time"),
 *     @OA\Property(property="status", type="string"),
 *     @OA\Property(property="controlled_by", type="integer", format="int64", nullable=true)
 * )
 *
 * @OA\Schema(
 *     schema="PlanSubscriptionCreate",
 *     type="object",
 *     required={"plan_id", "type"},
 *     @OA\Property(property="plan_id", type="integer", example=1),
 *     @OA\Property(property="type", type="string", enum={"monthly", "annually"}, example="monthly")
 * )
 *
 * @OA\Schema(
 *     schema="PlanSubscriptionUpdate",
 *     type="object",
 *     @OA\Property(property="type", type="string", enum={"monthly", "annually"}, example="annually")
 * )
 *
 * @OA\Response(
 *     response="ValidationError",
 *     description="Validation error",
 *     @OA\JsonContent(
 *         type="object",
 *         @OA\Property(property="message", type="string", example="The given data was invalid."),
 *         @OA\Property(property="errors", type="object")
 *     )
 * )
 *
 * @OA\Response(
 *     response="Unauthorized",
 *     description="Unauthorized",
 *     @OA\JsonContent(
 *         type="object",
 *         @OA\Property(property="message", type="string", example="Unauthorized.")
 *     )
 * )
 *
 * @OA\Response(
 *     response="NotFound",
 *     description="Resource not found",
 *     @OA\JsonContent(
 *         type="object",
 *         @OA\Property(property="message", type="string", example="Resource not found.")
 *     )
 * )
 */
class Components
{
    // This class serves as a container for Swagger annotations.
}
