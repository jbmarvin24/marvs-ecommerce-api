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
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2023-08-16',
    });
  }

  async createCheckoutPayment(
    successUrl: string,
    cancelUrl: string,
    orderItems: OrderItem[],
  ) {
    const session = await this.stripe.checkout.sessions.create({
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

  async confirmPayment(sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);

    return session.payment_status === 'paid';
  }
}
