# SCOS

To install dependencies:

- Install bun by follow the instruction here https://bun.sh/docs/installation
- bun install
- bun prepare
- bun db:migrate
- bun db:seed this is idempotent. so we can run it as much as we need.

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

Assumptions

1. total price does not include include discount and shipping cost. I based this assumption on the online shopping app
   For e.g., totalPrice = 1000, discount = 10 and shippingCost = 100.
   So the actual amount that customer will pay is 1000 - 10 + 100 = 1090
2. the db is supporting multi-currency and weight unit but not being used yet for simplicity.
3. The distance will be always rounded up. For e.g., 12.3 km will be 13 km.
