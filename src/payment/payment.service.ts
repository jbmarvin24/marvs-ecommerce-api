import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

export interface OrderItem {
  name: string;
  description?: string | null;
  unitAmount: number;
  quantity: number;
}

@Injectable()
export class PaymentService {
  async createCheckoutPayment(
    successUrl: string,
    cancelUrl: string,
    orderItems: OrderItem[],
  ) {
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2023-08-16',
    });

    const session = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: [
        ...orderItems.map<Stripe.Checkout.SessionCreateParams.LineItem>(
          ({ name, description, quantity, unitAmount }) => ({
            price_data: {
              currency: 'php',
              product_data: {
                name,
                description,
              },
              unit_amount: unitAmount * 100,
            },
            quantity,
          }),
        ),
      ],
    });

    return {
      id: session.id,
      paymentUrl: session.url,
    };
  }
}
