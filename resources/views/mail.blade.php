<h2>Xin chào {{ $order->fullname }},</h2>
<p>Cảm ơn bạn đã đặt hàng. Đơn hàng <strong>#{{ $order->code }}</strong> của bạn đang chờ xác nhận.</p>

<h3>Chi tiết đơn hàng:</h3>

@if ($order->orderDetails && count($order->orderDetails) > 0)
    <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Sản phẩm</th>
                <th>Màu</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($order->orderDetails as $detail)
                <tr>
                    <td>
                        {{ $detail->productVariant->product->name ?? 'N/A' }}
                    </td>
                    <td>
                        {{ $detail->productVariant->color->name ?? 'N/A' }}
                    </td>
                    <td>
                        {{ $detail->productVariant->size->name ?? 'N/A' }}
                    </td>
                    <td>{{ $detail->quantity }}</td>
                    <td>{{ number_format($detail->price) }} VND</td>
                    <td>{{ number_format($detail->price * $detail->quantity) }} VND</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@else
    <p>Không có sản phẩm trong đơn hàng.</p>
@endif


<div style="text-align: right;">
    <p><strong>Tổng tiền sản phẩm: {{ number_format($order->orderDetails->sum(function ($detail) { return $detail->price * $detail->quantity; })) }} VND</strong></p>

    <p><strong>Phí vận chuyển: {{ number_format($order->shiping ?: 0) }} VND</strong></p>

    <p><strong>Số tiền giảm: {{ number_format($order->discount ?: 0) }} VND</strong></p>

    <p><strong>Tổng tiền thanh toán: {{ number_format($order->total_price) }} VND</strong></p>

    <p>Phương thức thanh toán: {{ $order->payment }}</p>
</div>
