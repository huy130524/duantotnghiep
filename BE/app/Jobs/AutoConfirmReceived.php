<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AutoConfirmReceived implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $orderId;

    /**
     * Create a new job instance.
     *
     * @param int $orderId
     */
    public function __construct(int $orderId)
    {
        $this->orderId = $orderId;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $order = Order::find($this->orderId);

        if (!$order) {
            return;
        }
        if ($order->status !== 'Xác nhận đã giao') {
            return;
        }
        if (!$order->confirmed_delivered_at) {
            return;
        }
        // if ($order->confirmed_delivered_at->diffInDays(now()) >= 3) {
        //     $order->status = 'Xác nhận đã nhận';
        //     $order->save();
        // }
        if ($order->confirmed_delivered_at->diffInMinutes(now()) >= 1) {
            $order->status = 'Xác nhận đã nhận';
            $order->save();
        }
    }
}
