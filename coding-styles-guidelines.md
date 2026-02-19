# Code Guidelines

## 1. Principles

These principles form the foundation of our coding practices and should guide all decisions.

### 1.1. Consistency Over Personal Preference

All code must follow these guidelines, even if you disagree with specific choices. Consistency across the codebase is more valuable than individual preferences.

**Why:** Consistency reduces cognitive load during code reviews and makes it easier for team members to navigate unfamiliar code.

**Bad:**

```tsx
// Some files use 4 spaces, others use 2
const user = {
    name: 'John'
};

const payment = {
  amount: 100
};
```

**Good:**

```tsx
// All files follow the same indentation standard
const user = {
  name: 'John'
};

const payment = {
  amount: 100
};
```

### 1.2. Readability First

Code is written once but read many times—optimize for the reader. Prioritize clarity and self-documentation over brevity.

**Why:** Most development time is spent reading and understanding code, not writing it. Clear code reduces bugs and speeds up onboarding.

**Bad:**

```tsx
const d = new Date().getTime() - u.createdAt.getTime();
const s = d / 1000 / 60 / 60 / 24;
```

**Good:**

```tsx
const currentTimestamp = [Date.now](http://Date.now)();
const userCreatedAtTimestamp = user.createdAt.getTime();
const timeSinceCreationMs = currentTimestamp - userCreatedAtTimestamp;
const timeSinceCreationDays = timeSinceCreationMs / 1000 / 60 / 60 / 24;
```

---

## 2. Naming Conventions

Meaningful names are the foundation of readable code. They should be self-documenting and require minimal context to understand.

### 2.1. Use Meaningful Names

Variable names, function names, class names, and other identifiers should be descriptive and contextual. Prefer longer, descriptive names over brief abbreviations.

**Why:** Names are the primary way readers understand code intent. Ambiguous names force readers to hunt through code for context.

**Bad:**

```tsx
const d = new Date().getTime() - u.createdAt.getTime();
function parse(data: string): number;
const x = 5;
const fn = (a: User) => a.age > 18;
```

**Good:**

```tsx
const timeSinceCreation = [Date.now](http://Date.now)() - user.createdAt.getTime();
function parseUserAge(rawAge: string): number;
const maximumRetryAttempts = 5;
const isUserAdult = (user: User) => user.age > 18;
```

### 2.2. Use camelCase for Variables and Functions

All local variables, function names, and function parameters should use camelCase.

**Bad:**

```tsx
const UserName = 'John';
function GetUserData() {}
const payment_amount = 100;
```

**Good:**

```tsx
const userName = 'John';
function getUserData() {}
const paymentAmount = 100;
```

### 2.3. Use Nouns for Variables and Variable-Like Identifiers

Variables, constants, properties, and parameters should be named with nouns or noun phrases that describe what they contain or represent. They should answer "what is this?"

**Why:** Nouns clearly communicate that an identifier holds data or represents a thing. This makes it immediately obvious that you're working with a value, not performing an action. It also helps distinguish variables from functions at a glance.

**Bad:**

```tsx
// Variables named like actions
const process = getUserData();
const validate = true;
const calculate = payment.amount * 0.1;
const executing = false;

// Properties named like actions
type Config = {
  connect: string;
  validate: boolean;
  transform: number;
};
```

**Good:**

```tsx
// Variables named as nouns - what they contain
const userData = getUserData();
const isValid = true;
const discountAmount = payment.amount * 0.1;
const isExecuting = false;

// Properties named as nouns - what they represent
type Config = {
  connectionString: string;
  validationEnabled: boolean;
  transformFactor: number;
};

// Boolean variables often use is/has/should prefixes
const isActive = user.status === 'active';
const hasPermission = user.role === 'admin';
const shouldRetry = attemptCount < MAX_ATTEMPTS;
```

### 2.4. Use Verbs for Functions and Methods

Functions and methods should be named with verbs or verb phrases that describe what action they perform. They should answer "what does this do?"

**Why:** Verbs clearly communicate that an identifier performs an action or operation. This makes the code read naturally, like instructions, and makes it immediately obvious when you're calling a function versus accessing a variable. Function names should describe behavior, not data.

**Bad:**

```tsx
// Functions named like nouns
function userData(id: string): User { /* ... */ }
function validation(user: User): boolean { /* ... */ }
function paymentTotal(items: Item[]): number { /* ... */ }
function active(user: User): boolean { /* ... */ }

// Methods named like nouns
class OrderProcessor {
  items(): Item[] { /* ... */ }
  total(): number { /* ... */ }
  status(): string { /* ... */ }
}
```

**Good:**

```tsx
// Functions named as verbs - what they do
function getUserData(id: string): User { /* ... */ }
function validateUser(user: User): boolean { /* ... */ }
function calculatePaymentTotal(items: Item[]): number { /* ... */ }
function isUserActive(user: User): boolean { /* ... */ }

// Methods named as verbs - actions they perform
class OrderProcessor {
  getItems(): Item[] { /* ... */ }
  calculateTotal(): number { /* ... */ }
  getStatus(): string { /* ... */ }
}

// Boolean-returning functions often use is/has/can/should prefixes
function isValidEmail(email: string): boolean { /* ... */ }
function hasPermission(user: User, resource: string): boolean { /* ... */ }
function canProcessPayment(payment: Payment): boolean { /* ... */ }
function shouldRetryRequest(error: Error): boolean { /* ... */ }

// Common verb patterns
function getUser(id: string): User { /* ... */ }          // Retrieve
function createOrder(data: OrderData): Order { /* ... */ } // Create
function updatePayment(payment: Payment): void { /* ... */ } // Modify
function deleteAccount(id: string): void { /* ... */ }    // Remove
function calculateTotal(items: Item[]): number { /* ... */ } // Compute
function validateInput(data: unknown): boolean { /* ... */ } // Check
function formatCurrency(amount: number): string { /* ... */ } // Transform
function sendNotification(user: User): void { /* ... */ } // Send/dispatch
```

### 2.5. Use PascalCase for Types, Interfaces, Classes, and Enums

Type names, interface names, class names, enum names, and decorator names should use PascalCase to distinguish them from runtime values.

**Bad:**

```tsx
type user = { name: string };
interface paymentMethod { id: string }
class userService {}
enum status { active, inactive }
```

**Good:**

```tsx
type User = { name: string };
interface PaymentMethod { id: string }
class UserService {}
enum Status { Active, Inactive }
```

### 2.6. Use SCREAMING_SNAKE_CASE for Constants

File-level constants and static readonly properties should use SCREAMING_SNAKE_CASE to indicate they should never be modified.

**Why:** Constants are distinct from variables—this naming convention signals immutability and makes them searchable.

**Bad:**

```tsx
const maxRetries = 3;
const defaultTimeout = 5000;
const apiKey = 'secret-key';
```

**Good:**

```tsx
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;
const API_KEY = 'secret-key';
```

### 2.7. Use kebab-case for File Names

All file names should use kebab-case (lowercase with hyphens), regardless of the exported class or type name.

**Why:** File systems are case-sensitive on some platforms but not others. kebab-case is consistent across all systems and is the standard in web development.

**Bad:**

```
UserService.ts
PaymentProcessor.ts
getUserData.ts
```

**Good:**

```
user-service.ts
payment-processor.ts
get-user-data.ts
```

### 2.8. Follow File Suffix Patterns

Use consistent file suffixes to indicate the purpose and pattern of each TypeScript file. The suffix should come before the `.ts` extension and clearly communicate the file's architectural role.

**Why:** Consistent file naming makes the codebase navigable and self-documenting. Developers can immediately understand a file's purpose from its name, and IDEs can provide better autocomplete and search functionality. This also prevents architectural violations—you won't accidentally put business logic in a `.dto.ts` file.

**Bad:**

```tsx
// Inconsistent or missing suffixes make purpose unclear
user.ts
userStuff.ts
user-logic.ts
userData.ts
userHandler.ts
```

**Good:**

```tsx
// Clear, consistent suffixes communicate intent
user.entity.ts        // Database entity
user.service.ts       // Business logic
user.controller.ts    // HTTP endpoints
user.dto.ts          // Data transfer object
user.repository.ts   // Data access layer
```

### Standard Suffix Patterns

- `.adapter.ts` - External service integrations and adapter pattern implementations
- `.component.ts` - UI components (React, Angular)
- `.config.ts` - Configuration modules and settings
- `.constant.ts` - Shared constant values and enums
- `.controller.ts` - HTTP/API route handlers (NestJS controllers)
- `.decorator.ts` - Custom TypeScript/NestJS decorators
- `.dto.ts` - Data Transfer Objects for API contracts
- `.entity.ts` - Database entities (TypeORM, Prisma models)
- `.enum.ts` - Enumeration definitions
- `.factory.ts` - Factory pattern implementations for object creation
- `.filter.ts` - Exception filters and error handlers (NestJS)
- `.formatter.ts` - Value formatting and display logic
- `.gateway.ts` - WebSocket gateways and real-time handlers
- `.guard.ts` - Authorization and authentication guards (NestJS)
- `.helper.ts` - Stateless helper functions specific to a module
- `.interceptor.ts` - Request/response interceptors (NestJS)
- `.interface.ts` - TypeScript interface, type, and union definitions
- `.mapper.ts` - Object mapping and transformation logic
- `.middleware.ts` - Express/NestJS middleware
- `.mock.ts` - Mock data and test doubles
- `.model.ts` - Domain models and business objects
- `.module.ts` - Module definitions (NestJS, Angular)
- `.pipe.ts` - Data transformation and validation pipes (NestJS)
- `.provider.ts` - Dependency injection providers
- `.repository.ts` - Data access and persistence layer
- `.resolver.ts` - GraphQL resolvers
- `.schema.ts` - Validation schemas (Joi, Zod) and GraphQL schemas
- `.service.ts` - Business logic and use cases
- `.spec.ts` - Unit and integration tests (Jest)
- `.strategy.ts` - Strategy pattern implementations
- `.test.ts` - Test files (alternative to .spec.ts)
- `.type.ts` - TypeScript GraphQL type definitions
- `.util.ts` - General utility functions (use sparingly)
- `.validator.ts` - Custom validation logic and rules

### 2.9. Use Searchable Names

Use meaningful constants instead of magic numbers or strings. This makes code searchable and maintainable.

**Why:** When debugging or refactoring, you can search for the constant name. Magic numbers scattered throughout code are impossible to track.

**Bad:**

```tsx
const lookbackDate = subMinutes(new Date(), 30);
if (user.status === 1) { /* ... */ }
const retryCount = 5;
```

**Good:**

```tsx
const PAYMENT_STATUS_LOOKBACK_MINUTES = 30;
const lookbackDate = subMinutes(new Date(), PAYMENT_STATUS_LOOKBACK_MINUTES);

enum UserStatus { Active = 1, Inactive = 2 }
if (user.status === UserStatus.Active) { /* ... */ }

const MAX_RETRY_ATTEMPTS = 5;
const retryCount = MAX_RETRY_ATTEMPTS;
```

### 2.10. Avoid Redundant Context

If the class, type, or object name already provides context, don't repeat it in property or variable names.

**Why:** Redundancy adds noise without adding clarity. The type system already provides context.

**Bad:**

```tsx
type User = {
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
};

class PaymentProcessor {
  processPayment() {}
  validatePayment() {}
}
```

**Good:**

```tsx
type User = {
  name: string;
  email: string;
  phoneNumber: string;
};

class PaymentProcessor {
  process() {}
  validate() {}
}
```

### 2.11. Do Not Use Underscores as Prefixes

Do not use `_` as a prefix for private properties. Use TypeScript's `private` keyword instead.

**Why:** TypeScript's visibility modifiers are explicit and enforced by the compiler. Underscore prefixes are just conventions and don't prevent access.

**Bad:**

```tsx
class User {
  _id: string;
  _email: string;
}
```

**Good:**

```tsx
class User {
  private id: string;
  private email: string;
}
```

---

## 3. Types and Interfaces

TypeScript's type system is your first line of defense against bugs. Use it effectively.

### 3.1. Prefer Types Over Interfaces

Use `type` for most type definitions unless you specifically need interface features like `extends` or `implements`.

**Why:** Types are more flexible and expressive. They support unions, intersections, and mapped types. Interfaces are useful for defining class contracts, but types handle most use cases better.

**Bad:**

```tsx
interface User {
  name: string;
  email: string;
}

interface Admin extends User {
  role: 'admin';
}
```

**Good:**

```tsx
type User = {
  name: string;
  email: string;
};

type Admin = User & {
  role: 'admin';
};
```

### 3.2. Prefer `unknown` Over `any`

When you need a type that can hold any value but want to maintain type safety, use `unknown` instead of `any`.

**Why:** `any` disables type checking entirely. `unknown` requires you to narrow the type before using it, maintaining safety.

**Bad:**

```tsx
function processData(data: any) {
  return data.toUpperCase(); // No error, but might crash at runtime
}
```

**Good:**

```tsx
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  throw new Error('Expected a string');
}
```

### 3.3. Use Discriminated Unions for State

Model state and results using discriminated unions (tagged unions) instead of nullable fields. This makes impossible states unrepresentable and forces handling of all cases.

**Why:** Discriminated unions make all possible states explicit and ensure you handle every case. TypeScript's exhaustiveness checking prevents you from forgetting edge cases, eliminating entire classes of bugs.

**Bad:**

```tsx
type PaymentResult = {
  success: boolean;
  error?: string;
  transaction?: Transaction;
  refundId?: string;
};

function handlePayment(result: PaymentResult) {
  if (result.success && result.transaction) {
    // What if success is true but transaction is undefined?
    processTransaction(result.transaction);
  } else if (!result.success && result.error) {
    // What if success is false but error is undefined?
    logError(result.error);
  }
  // What about refundId? When is it present?
}
```

**Good:**

```tsx
type PaymentResult =
  | { status: 'success'; transaction: Transaction }
  | { status: 'failed'; error: string }
  | { status: 'refunded'; refundId: string; transaction: Transaction };

function handlePayment(result: PaymentResult) {
  switch (result.status) {
    case 'success':
      processTransaction(result.transaction);
      break;
    case 'failed':
      logError(result.error);
      break;
    case 'refunded':
      processRefund(result.refundId, result.transaction);
      break;
    // TypeScript ensures all cases are handled
  }
}
```

### 3.4. Derive Types from Library Exports

Always derive your types from library-exported types instead of creating parallel definitions. Use TypeScript's utility types (`Parameters`, `ReturnType`, `Awaited`) and library-provided types to ensure type safety matches runtime behavior.

**Why:** Libraries can change their internal types between versions. When you create your own parallel types, they can drift from the actual implementation, causing runtime errors that TypeScript can't catch. Deriving types ensures your code stays synchronized with the library's actual behavior.

**Bad:**

```tsx
// Manually defining types that should come from the library
type ExpressRequest = {
  body: unknown;
  params: Record<string, string>;
  query: Record<string, string>;
};

// Creating your own event type instead of using the library's
type StripeWebhookEvent = {
  id: string;
  type: string;
  data: { object: any };
};

// Assuming return types instead of deriving them
type UserQueryResult = {
  id: string;
  email: string;
  createdAt: Date;
};

async function getUser(id: string): Promise<UserQueryResult> {
  return await prisma.user.findUnique({ where: { id } });
}
```

**Good:**

```tsx
// Import and use the actual types from libraries
import { Request } from 'express';
import Stripe from 'stripe';
import { User, Prisma } from '@prisma/client';

// Derive types from actual implementations
type CreateUserInput = Prisma.UserCreateInput;
type UserWithPosts = Prisma.UserGetPayload<{ include: { posts: true } }>;

// Use ReturnType to match actual function returns
type DatabaseUser = Awaited<ReturnType<typeof prisma.user.findUnique>>;

// Use library's actual event types
function handleStripeWebhook(event: Stripe.Event): void {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = [event.data](http://event.data).object as Stripe.PaymentIntent;
      // TypeScript knows the exact shape
      break;
  }
}

// Derive parameter types from actual functions
type SendEmailParams = Parameters<typeof emailService.send>[0];
```

---

## 4. Objects and Data Structures

### 4.1. Prefer Immutability

Mark properties as `readonly` to prevent accidental mutations. Immutable code is easier to reason about and debug.

**Why:** Mutations are a common source of bugs. Immutability signals intent and prevents accidental changes.

**Bad:**

```tsx
type Payment = {
  totalAmount: number;
  feeAmount: number;
};

const payment: Payment = { totalAmount: 100, feeAmount: 10 };
payment.totalAmount = 200; // Oops, accidentally modified
```

**Good:**

```tsx
type Payment = {
  readonly totalAmount: number;
  readonly feeAmount: number;
};

const payment: Payment = { totalAmount: 100, feeAmount: 10 };
// payment.totalAmount = 200; // Compiler error
```

### 4.2. Use Functional Construction for Maps and Sets

When creating Maps or Sets from arrays, use functional construction with the constructor instead of imperative loops with mutations.

**Why:** Functional construction is more concise, immutable by design, and eliminates the risk of forgetting to initialize the collection or accidentally mutating it during construction. It also makes the intent clearer—you're transforming an array into a Map in one atomic operation.

**Bad:**

```tsx
// Imperative approach with mutations
const userMap = new Map<string, User>();
users.forEach(user => {
  userMap.set([user.id](http://user.id), user);
});

// Multiple statements, easy to misplace
const paymentMap = new Map<string, Payment>();
for (const payment of payments) {
  paymentMap.set([payment.id](http://payment.id), payment);
}

// Risky - map might be used before population
const orderMap = new Map<string, Order>();
// ... other code ...
orders.forEach(order => orderMap.set([order.id](http://order.id), order));
```

**Good:**

```tsx
// Functional construction - single expression
const userMap = new Map(
  [users.map](http://users.map)(user => [[user.id](http://user.id), user])
);

// Clear intent with type inference
const paymentMap = new Map(
  [payments.map](http://payments.map)(payment => [[payment.id](http://payment.id), payment])
);

// Can be made readonly immediately
const orderMap: ReadonlyMap<string, Order> = new Map(
  [orders.map](http://orders.map)(order => [[order.id](http://order.id), order])
);

// Works with Sets too
const uniqueEmails = new Set(
  [users.map](http://users.map)(user => [user.email](http://user.email))
);
```

### 4.3. Use Object.entries() and Object.fromEntries() for Object Transformations

When transforming objects, use functional approaches with Object.entries() instead of for...in loops. This avoids prototype pollution and is more expressive.

**Why:** Object.entries() only iterates over own properties, avoiding prototype pollution bugs. The functional approach is composable, easier to test, and makes the transformation intent clear.

**Bad:**

```tsx
// for...in includes prototype properties
const transformed: Record<string, number> = {};
for (const key in original) {
  transformed[key] = original[key] * 2;
}

// Manual object building
const filtered: Record<string, string> = {};
for (const [key, value] of Object.entries(original)) {
  if (value != null) {
    filtered[key] = value;
  }
}

// Imperative key transformation
const renamed: Record<string, any> = {};
Object.keys(original).forEach(key => {
  renamed[key.toUpperCase()] = original[key];
});
```

**Good:**

```tsx
// Functional transformation
const transformed = Object.fromEntries(
  Object.entries(original).map(([key, value]) => [key, value * 2])
);

// Filtering with functional approach
const filtered = Object.fromEntries(
  Object.entries(original).filter(([_, value]) => value != null)
);

// Key transformation
const renamed = Object.fromEntries(
  Object.entries(original).map(([key, value]) => [key.toUpperCase(), value])
);

// Composable transformations
const processedData = Object.fromEntries(
  Object.entries(rawData)
    .filter(([_, value]) => value != null)
    .map(([key, value]) => [toCamelCase(key), parseValue(value)])
);
```

---

## 5. Functions

### 5.1. Keep Functions Small and Focused

Functions should do one thing and do it well. If a function has multiple responsibilities, split it.

**Why:** Small, focused functions are easier to test, reuse, and reason about. They have fewer reasons to change.

**Bad:**

```tsx
function processUser(user: User) {
  // Validate
  if (![user.email](http://user.email)) throw new Error('Invalid email');

  // Transform
  const transformed = { ...user, email: [user.email](http://user.email).toLowerCase() };

  // Save
  [database.save](http://database.save)(transformed);

  // Send email
  emailService.send([user.email](http://user.email));
}
```

**Good:**

```tsx
function validateUser(user: User): void {
  if (![user.email](http://user.email)) throw new Error('Invalid email');
}

function normalizeUser(user: User): User {
  return { ...user, email: [user.email](http://user.email).toLowerCase() };
}

function saveUser(user: User): void {
  [database.save](http://database.save)(user);
}

function notifyUser(user: User): void {
  emailService.send([user.email](http://user.email));
}

async function processUser(user: User): Promise<void> {
  validateUser(user);
  const normalized = normalizeUser(user);
  await saveUser(normalized);
  await notifyUser(normalized);
}
```

### 5.2. Avoid Negative Conditionals

Use positive conditionals instead of negative ones. They're easier to read and understand.

**Why:** Negative conditionals require mental inversion. Positive conditionals are more intuitive.

**Bad:**

```tsx
function isPhoneNotValid(phone: string): boolean {
  return phone.length < 10;
}

if (isPhoneNotValid(phone)) {
  throw new Error('Invalid phone');
}
```

**Good:**

```tsx
function isPhoneValid(phone: string): boolean {
  return phone.length >= 10;
}

if (!isPhoneValid(phone)) {
  throw new Error('Invalid phone');
}
```

### 5.3. Limit Function Parameters

Keep function parameters to 2 or fewer. If you need more, use an object parameter with destructuring.

**Why:** Many parameters make functions hard to test and understand. Objects with named properties are clearer.

**Bad:**

```tsx
function createPayment(
  userId: string,
  amount: number,
  currency: string,
  description: string,
  metadata: object
) {
  // ...
}

createPayment('user-123', 100, 'USD', 'Payment', {});
```

**Good:**

```tsx
type CreatePaymentParams = {
  userId: string;
  amount: number;
  currency: string;
  description: string;
  metadata?: object;
};

function createPayment(params: CreatePaymentParams) {
  const { userId, amount, currency, description, metadata } = params;
  // ...
}

createPayment({
  userId: 'user-123',
  amount: 100,
  currency: 'USD',
  description: 'Payment'
});
```

### 5.4. Avoid Premature Optimization

Write clear, correct code first—optimize only when you have measured performance problems. Premature optimization leads to complex, unmaintainable code that often isn't even faster.

**Why:** Most performance problems come from architectural issues, not micro-optimizations. Clear code is easier to profile and optimize when real bottlenecks are identified. Complex "optimized" code often performs worse than simple code due to modern compiler optimizations.

**Bad:**

```tsx
// Premature optimization with manual caching
const userCache = new Map();
function getUser(id: string): User {
  if (!userCache.has(id)) {
    const user = database.findUser(id);
    userCache.set(id, user);
  }
  return userCache.get(id);
}

// Overly clever bit manipulation instead of readable code
const isEven = (n: number) => !(n & 1); // Who remembers bitwise operations?

// Manual string concatenation for "performance"
let html = '';
for (const item of items) {
  html += '<li>' + item + '</li>';
}
```

**Good:**

```tsx
// Simple, clear implementation
function getUser(id: string): User {
  return database.findUser(id);
}
// Add caching later IF profiling shows it's needed

// Clear intent
const isEven = (n: number) => n % 2 === 0;

// Use appropriate methods
const html = [items.map](http://items.map)(item => \`<li>\${item}</li>\`).join('');
```

### 5.5. Use Early Returns and Guard Clauses

Exit functions early when preconditions aren't met instead of nesting the entire function body in if-statements. This reduces nesting and makes the happy path more obvious.

**Why:** Early returns eliminate nested conditionals and make the main logic easier to follow. The function's preconditions become explicit guards at the top, separating validation from business logic.

**Bad:**

```tsx
function processPayment(payment: Payment): PaymentResult {
  if (payment) {
    if (payment.amount > 0) {
      if (payment.currency === 'USD') {
        // Actual logic buried in nested ifs
        const fee = calculateFee(payment.amount);
        const total = payment.amount + fee;
        return chargeCard(payment.cardId, total);
      } else {
        throw new Error('Only USD supported');
      }
    } else {
      throw new Error('Invalid amount');
    }
  } else {
    throw new Error('Payment required');
  }
}
```

**Good:**

```tsx
function processPayment(payment: Payment): PaymentResult {
  // Guard clauses first
  if (!payment) {
    throw new Error('Payment required');
  }

  if (payment.amount <= 0) {
    throw new Error('Invalid amount');
  }

  if (payment.currency !== 'USD') {
    throw new Error('Only USD supported');
  }

  // Happy path is not nested
  const fee = calculateFee(payment.amount);
  const total = payment.amount + fee;
  return chargeCard(payment.cardId, total);
}
```

### 5.6. Prefer Async/Await Over Promises

Always use async/await syntax instead of .then() chains for asynchronous code. It's more readable, easier to debug, and handles errors more predictably.

**Why:** Async/await makes asynchronous code look synchronous, reducing cognitive load. Stack traces are clearer, debugging is easier with proper line numbers, and error handling with try/catch is more intuitive than .catch() chains.

**Bad:**

```tsx
function processUser(userId: string): Promise<void> {
  return getUserById(userId)
    .then(user => {
      return validateUser(user);
    })
    .then(validUser => {
      return updateUser(validUser);
    })
    .then(updatedUser => {
      return sendNotification([updatedUser.email](http://updatedUser.email));
    })
    .catch(error => {
      console.error('Error processing user:', error);
      throw error;
    });
}

// Mixed promises and callbacks
function fetchData(): Promise<Data> {
  return new Promise((resolve, reject) => {
    getFromDatabase((error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}
```

**Good:**

```tsx
async function processUser(userId: string): Promise<void> {
  try {
    const user = await getUserById(userId);
    const validUser = await validateUser(user);
    const updatedUser = await updateUser(validUser);
    await sendNotification([updatedUser.email](http://updatedUser.email));
  } catch (error) {
    console.error('Error processing user:', error);
    throw error;
  }
}

// Use util.promisify or native promises
import { promisify } from 'util';

async function fetchData(): Promise<Data> {
  const getFromDatabaseAsync = promisify(getFromDatabase);
  return await getFromDatabaseAsync();
}
```

### 5.7. Prefer Explicit Returns in Arrow Functions

Use explicit return statements with curly braces for arrow functions longer than one line. Implicit returns with parentheses can hide bugs and make debugging difficult.

**Why:** Explicit returns make the intent clear and allow you to add debugging statements or additional logic later. Implicit returns with complex expressions are hard to debug and can accidentally return undefined.

**Bad:**

```tsx
// Implicit return with complex logic - hard to debug
const calculateTotal = (items: Item[]) => (
  items
    .filter(item => item.active)
    .reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.08
);

// Confusing parentheses for multiline
const processUser = (user: User) => (
  validateUser(user),
  normalizeUser(user),
  saveUser(user) // Only this is returned!
);

// Easy to accidentally return undefined
const getDiscount = (user: User) =>
  user.isPremium
    ? user.orders > 10
      ? 0.2
      : 0.1
    : 0; // What if we miss a case?
```

**Good:**

```tsx
// Explicit return with clear intent
const calculateTotal = (items: Item[]): number => {
  const activeItems = items.filter(item => item.active);
  const subtotal = activeItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const TAX_RATE = 0.08;
  return subtotal * (1 + TAX_RATE);
};

// Clear sequential operations
const processUser = async (user: User): Promise<User> => {
  validateUser(user);
  const normalized = normalizeUser(user);
  const saved = await saveUser(normalized);
  return saved;
};

// Explicit returns prevent confusion
const getDiscount = (user: User): number => {
  if (!user.isPremium) {
    return 0;
  }

  if (user.orders > 10) {
    return 0.2;
  }

  return 0.1;
};
```

### 5.8. Fail Fast with Early Validation

Validate inputs and preconditions at the earliest possible point in your application flow. Never allow invalid data to propagate deeper into your business logic. Fail immediately with clear error messages rather than attempting partial processing.

**Why:** Early validation prevents corrupt data from spreading through your system, making bugs easier to trace. When errors occur deep in the call stack, debugging becomes a nightmare. Failing fast also prevents partial operations that could leave your system in an inconsistent state.

**Bad:**

```tsx
// Validation scattered throughout the function
async function processPayment(paymentData: any): Promise<PaymentResult> {
  const user = await getUserById(paymentData.userId);

  // Error happens deep in the stack after side effects
  const card = await getCardById(paymentData.cardId);

  if (paymentData.amount) {
    const convertedAmount = Number(paymentData.amount);
    // What if amount is NaN? Error occurs after we've already fetched data

    if (user && card) {
      // Finally validating after multiple database calls
      if (convertedAmount > 0) {
        return await chargeCard(card, convertedAmount);
      }
    }
  }

  throw new Error('Payment failed');
}

// Allowing invalid state to propagate
class OrderService {
  async createOrder(items: OrderItem[], userId?: string): Promise<Order> {
    // Proceeding without validating userId
    const order = await this.orderRepo.create({ items });

    // userId might be undefined, causing issues later
    await this.notificationService.notifyUser(userId!, order);

    return order;
  }
}
```

**Good:**

```tsx
// All validation happens first, before any operations
async function processPayment(paymentData: unknown): Promise<PaymentResult> {
  // Validate input structure immediately
  if (!isValidPaymentData(paymentData)) {
    throw new Error('Invalid payment data structure');
  }

  // Validate business rules before any I/O
  const amount = Number(paymentData.amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error(\`Invalid payment amount: \${paymentData.amount}\`);
  }

  if (!paymentData.userId || !paymentData.cardId) {
    throw new Error('Missing required payment fields');
  }

  // Only proceed with I/O after all validation passes
  const [user, card] = await Promise.all([
    getUserById(paymentData.userId),
    getCardById(paymentData.cardId)
  ]);

  if (!user) {
    throw new Error(\`User not found: \${paymentData.userId}\`);
  }

  if (!card) {
    throw new Error(\`Card not found: \${paymentData.cardId}\`);
  }

  // Business logic executes with validated data
  return await chargeCard(card, amount);
}

// Fail fast with guard clauses
class OrderService {
  async createOrder(items: OrderItem[], userId: string): Promise<Order> {
    // Validate all inputs immediately
    if (!userId) {
      throw new Error('userId is required for order creation');
    }

    if (!items || items.length === 0) {
      throw new Error('Cannot create order with no items');
    }

    // Validate each item before processing
    for (const item of items) {
      if (!item.productId || item.quantity <= 0) {
        throw new Error(\`Invalid order item: \${JSON.stringify(item)}\`);
      }
    }

    // All operations proceed with validated data
    const order = await this.orderRepo.create({ items, userId });
    await this.notificationService.notifyUser(userId, order);

    return order;
  }
}
```

---

## 6. Classes

### 6.1. Use Visibility Modifiers

Explicitly mark class members as `protected` or `private` when they should not be part of the public API. Since `public` is the default in TypeScript, it can be omitted, but `private` and `protected` must be explicitly declared to control access and signal intent.

**Why:** Visibility modifiers prevent accidental misuse of internal implementation details. Marking members as `private` or `protected` makes the intended API contract clear and prevents external code from depending on internal state.

**Bad:**

```tsx
class UserService {
  users: User[] = []; // Exposed publicly - can be modified from outside

  addUser(user: User) {
    this.users.push(user);
  }
}
```

**Good:**

```tsx
class UserService {
  private users: User[] = []; // Internal state protected from external access

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): readonly User[] {
    return this.users;
  }
}
```

### 6.2. Prefer Composition Over Inheritance

Use composition (has-a relationships) instead of inheritance (is-a relationships) when possible. Compose behavior by injecting dependencies rather than extending base classes.

**Why:** Composition is more flexible and avoids the fragile base class problem. It allows you to change behavior at runtime, makes testing easier with dependency injection, and prevents deep inheritance hierarchies that are difficult to understand and modify.

**Bad:**

```tsx
// Inheritance creates tight coupling and rigid hierarchies
class Animal {
  move() {
    console.log('Moving...');
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof!');
  }
}

class Cat extends Animal {
  meow() {
    console.log('Meow!');
  }
}

// What if we need a RobotDog that barks but doesn't move like an animal?
// We're forced into awkward inheritance hierarchies
class RobotDog extends Dog {
  move() {
    // Override to change behavior - fragile!
    console.log('Rolling on wheels...');
  }
}

```

**Good:**

```tsx
// Define behavior interfaces
interface Movable {
  move(): void;
}

interface Soundable {
  makeSound(): void;
}

// Create composable behavior implementations
class AnimalMovement implements Movable {
  move(): void {
    console.log('Walking on legs...');
  }
}

class WheelMovement implements Movable {
  move(): void {
    console.log('Rolling on wheels...');
  }
}

class BarkSound implements Soundable {
  makeSound(): void {
    console.log('Woof!');
  }
}

class MeowSound implements Soundable {
  makeSound(): void {
    console.log('Meow!');
  }
}

// Compose behavior through dependency injection
class Dog {
  constructor(
    private movement: Movable,
    private sound: Soundable
  ) {}

  move(): void {
    this.movement.move();
  }

  makeSound(): void {
    this.sound.makeSound();
  }
}

class Cat {
  constructor(
    private movement: Movable,
    private sound: Soundable
  ) {}

  move(): void {
    this.movement.move();
  }

  makeSound(): void {
    this.sound.makeSound();
  }
}

// Easy to create different combinations without inheritance
const realDog = new Dog(new AnimalMovement(), new BarkSound());
realDog.move(); // "Walking on legs..."
realDog.makeSound(); // "Woof!"

const robotDog = new Dog(new WheelMovement(), new BarkSound());
robotDog.move(); // "Rolling on wheels..."
robotDog.makeSound(); // "Woof!"

const cat = new Cat(new AnimalMovement(), new MeowSound());
cat.move(); // "Walking on legs..."
cat.makeSound(); // "Meow!"

```

---

## 7. Modules and Exports

### 7.1. Use Named Exports

Always use named exports. Avoid default exports.

**Why:** Named exports provide a canonical name and make imports consistent. Default exports can lead to accidental mismatches.

**Bad:**

```tsx
// user-service.ts
export default class UserService {
  // ...
}

// main.ts
import UserService from './user-service'; // Could be named anything
import WrongName from './user-service'; // No error!
```

**Good:**

```tsx
// user-service.ts
export class UserService {
  // ...
}

// main.ts
import { UserService } from './user-service'; // Clear and explicit
```

### 7.2. Do Not Export Unless Necessary

Only export symbols that are used outside the module. Minimize the exported API surface.

**Why:** Smaller APIs are easier to maintain. Internal symbols can change without affecting consumers.

**Bad:**

```tsx
// payment-processor.ts
export function validatePayment(payment: Payment): boolean { /* ... */ }
export function calculateFee(amount: number): number { /* ... */ }
export function logTransaction(payment: Payment): void { /* ... */ }
export class PaymentProcessor {
  process(payment: Payment) {
    if (validatePayment(payment)) {
      const fee = calculateFee(payment.amount);
      logTransaction(payment);
    }
  }
}
```

**Good:**

```tsx
// payment-processor.ts
function validatePayment(payment: Payment): boolean { /* ... */ }
function calculateFee(amount: number): number { /* ... */ }
function logTransaction(payment: Payment): void { /* ... */ }

export class PaymentProcessor {
  process(payment: Payment) {
    if (validatePayment(payment)) {
      const fee = calculateFee(payment.amount);
      logTransaction(payment);
    }
  }
}
```

### 7.3. Avoid Barrel Exports (index.ts)

Don't use index.ts files to re-export everything from a directory. Import directly from the source file instead.

**Why:** Barrel exports create circular dependency risks, hurt tree-shaking and bundle optimization, and make it harder to track where imports come from. They also slow down TypeScript compilation and IDE performance.

**Bad:**

```tsx
// users/index.ts - Barrel export
export * from './user.service';
export * from './user.controller';
export * from './user.repository';
export * from './dto/create-user.dto';
export * from './dto/update-user.dto';

// main.ts - Unclear where each export comes from
import {
  UserService,
  UserController,
  CreateUserDto
} from './users'; // Which file defines what?

// Circular dependency risk
// users/index.ts exports from user.service.ts
// user.service.ts imports from users/index.ts = circular!
```

**Good:**

```tsx
// main.ts - Clear, explicit imports
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { CreateUserDto } from './users/dto/create-user.dto';

// For module exports, only export the module itself
// users/users.module.ts
export { UsersModule } from './users.module';

// Import the module directly
import { UsersModule } from './users/users.module';
```

---

## 8. Logic and Control Flow

### 8.1. Use Triple Equals for Comparisons

Always use `===` and `!==` instead of `==` and `!=`.

**Why:** Double equals performs type coercion, which can lead to unexpected results. Triple equals is explicit and predictable.

**Bad:**

```tsx
if (user.age == '18') { /* ... */ } // True! String coerced to number
if (status != 0) { /* ... */ } // Might be null or undefined
```

**Good:**

```tsx
if (user.age === 18) { /* ... */ } // Clear type match
if (status !== null && status !== undefined) { /* ... */ } // Explicit
```

### 8.2. Avoid Flag Parameters

Don't use boolean parameters to control function behavior. Split into separate functions instead.

**Why:** Flag parameters indicate the function does multiple things. Separate functions are clearer and easier to test.

**Bad:**

```tsx
function processPayment(payment: Payment, isRefund: boolean) {
  if (isRefund) {
    // Refund logic
  } else {
    // Payment logic
  }
}

processPayment(payment, false);
processPayment(payment, true);
```

**Good:**

```tsx
function processPayment(payment: Payment): void {
  // Payment logic
}

function refundPayment(payment: Payment): void {
  // Refund logic
}

processPayment(payment);
refundPayment(payment);
```

---

## 9. Error Handling

### 9.1. Always Throw Errors

Throw `Error` instances, not strings or other values. Always use `new Error()`.

**Why:** Error instances include stack traces, which are essential for debugging. Strings lose context.

**Bad:**

```tsx
throw 'Payment failed'; // No stack trace
throw { message: 'Payment failed' }; // Not an Error instance
```

**Good:**

```tsx
throw new Error('Payment failed');
```

### 9.2. Handle Errors Explicitly

Never silently ignore caught errors. Always handle them or re-throw.

**Why:** Silently ignoring errors hides bugs and makes debugging impossible.

**Bad:**

```tsx
try {
  processPayment(payment);
} catch (error) {
  // Silently ignored
}
```

**Good:**

```tsx
try {
  processPayment(payment);
} catch (error) {
  logger.error('Payment processing failed', error);
  throw error; // Re-throw or handle appropriately
}
```

### 9.3. Implement Proper Database Transaction Patterns

Always use database transactions for operations that modify multiple tables, and ensure proper rollback handling. Pass transaction objects explicitly through your call stack.

**Why:** Without transactions, partial failures leave your database in an inconsistent state. Explicit transaction passing makes the transactional boundary clear and prevents accidentally running queries outside the transaction.

**Bad:**

```tsx
// No transaction - partial failure leaves inconsistent state
async function transferFunds(fromId: string, toId: string, amount: number) {
  await this.accountRepo.decrementBalance(fromId, amount);
  // What if this fails? First account already debited!
  await this.accountRepo.incrementBalance(toId, amount);
  await this.auditRepo.logTransfer(fromId, toId, amount);
}

// Hidden transaction management
class UserService {
  async createUserWithProfile(data: CreateUserData) {
    // Transaction started here but not visible to caller
    const user = await this.userRepo.create(data.user);
    const profile = await this.profileRepo.create(data.profile);
    return { user, profile };
  }
}
```

**Good:**

```tsx
// Explicit transaction with proper error handling
async function transferFunds(
  fromId: string,
  toId: string,
  amount: number
): Promise<void> {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await this.accountRepo.decrementBalance(fromId, amount, queryRunner);
    await this.accountRepo.incrementBalance(toId, amount, queryRunner);
    await this.auditRepo.logTransfer(fromId, toId, amount, queryRunner);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

// Transaction passed explicitly through the stack
class UserService {
  async createUserWithProfile(
    data: CreateUserData,
    queryRunner?: QueryRunner
  ): Promise<{ user: User; profile: Profile }> {
    const shouldManageTransaction = !queryRunner;
    queryRunner = queryRunner || this.dataSource.createQueryRunner();

    if (shouldManageTransaction) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

    try {
      const user = await this.userRepo.create(data.user, queryRunner);
      const profile = await this.profileRepo.create(data.profile, queryRunner);

      if (shouldManageTransaction) {
        await queryRunner.commitTransaction();
      }

      return { user, profile };
    } catch (error) {
      if (shouldManageTransaction) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      if (shouldManageTransaction) {
        await queryRunner.release();
      }
    }
  }
}
```

### 9.4. Use Platform-Defined Errors

Always use platform-defined error classes (custom domain errors extending from `PlatformError`) instead of native TypeScript `Error` class. Only use native `Error` when writing reusable library code in the `lib` directory that is project-agnostic.

**Why:** Platform-defined errors provide consistent error handling, proper HTTP status codes, structured error responses, and better integration with your framework's error handling middleware. They make errors more actionable and easier to handle across your application. Native errors should only be used in generic library code that doesn't depend on your application's context.

**Bad:**

```tsx
// In application code - using native Error
@Injectable()
export class PaymentService {
  async processPayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepo.findById(paymentId);

    if (!payment) {
      throw new Error('Payment not found'); // Generic, no HTTP context
    }

    if (payment.status !== 'pending') {
      throw new Error('Payment already processed'); // No status code
    }

    if (payment.amount <= 0) {
      throw new Error('Invalid payment amount'); // Not a proper HTTP error
    }

    return await this.chargeCard(payment);
  }
}

// In controller - inconsistent error handling
@Controller('payments')
export class PaymentController {
  @Post(':id/process')
  async process(@Param('id') id: string) {
    try {
      return await this.paymentService.processPayment(id);
    } catch (error) {
      // Manual status code mapping required
      throw new HttpException(error.message, 500);
    }
  }
}
```

**Good:**

```tsx
// In application code - using platform-defined errors
@Injectable()
export class PaymentService {
  async processPayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepo.findById(paymentId);

    if (!payment) {
      throw new NotFoundError(\`Payment not found: \${paymentId}\`);
    }

    if (payment.status !== 'pending') {
      throw new ConflictError(
        \`Payment already processed with status: \${payment.status}\`
      );
    }

    if (payment.amount <= 0) {
      throw new BadRequestError(
        \`Invalid payment amount: \${payment.amount}\`
      );
    }

    return await this.chargeCard(payment);
  }
}

// In controller - automatic error handling
@Controller('payments')
export class PaymentController {
  @Post(':id/process')
  async process(@Param('id') id: string) {
    // Framework automatically handles platform errors
    return await this.paymentService.processPayment(id);
  }
}

// In lib directory - use native Error for reusable code
// lib/utils/string-helpers.ts
export function parseJson<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    // Native Error is appropriate here - this is generic library code
    throw new Error(\`Failed to parse JSON: \${error.message}\`);
  }
}

// Custom domain errors extend PlatformError base class
export class InsufficientFundsError extends PlatformError {
  constructor(accountId: string, required: number, available: number) {
    super({
      message: 'Insufficient funds for transaction',
      statusCode: HttpStatus.BAD_REQUEST,
      accountId,
      required,
      available,
    });
  }
}
```

---

## 10. Comments and Documentation

### 10.1. Prefer Self-Documenting Code

Code should be clear enough to understand without comments. Use comments only for "why," not "what."

**Why:** Comments can become outdated. Code doesn't lie—it's the source of truth.

**Bad:**

```tsx
// Loop through users
for (const user of users) {
  // Check if user is active
  if (user.status === UserStatus.Active) {
    // Send email
    emailService.send([user.email](http://user.email));
  }
}
```

**Good:**

```tsx
function notifyActiveUsers(users: User[]): void {
  for (const user of users) {
    if (user.status === UserStatus.Active) {
      emailService.send([user.email](http://user.email));
    }
  }
}

notifyActiveUsers(users);
```

---

## 11. Database and SQL

### 11.1. Use Uppercase for SQL Keywords

Write all SQL keywords in uppercase (SELECT, FROM, WHERE, JOIN, etc.) to distinguish them from table names, column names, and values. This follows industry-standard SQL formatting conventions.

**Why:** Uppercase SQL keywords make queries more readable by creating visual separation between SQL syntax and your data. This is the widely accepted standard in the database community, making your queries immediately familiar to any developer or DBA. It also makes complex queries easier to scan and understand.

**Bad:**

```tsx
// SQL keywords in lowercase blend with identifiers
const query = \`
  select [u.id](http://u.id), [u.email](http://u.email), p.amount
  from users u
  inner join payments p on p.user_id = [u.id](http://u.id)
  where u.status = 'active'
    and p.created_at > $1
  order by p.created_at desc
  limit 10
\`;

// Mixed case is inconsistent and unprofessional
const updateQuery = \`
  Update payments
  Set status = 'processed'
  WHERE id = $1
    and status = 'pending'
\`;

// Hard to distinguish SQL from data in complex queries
const report = \`
  with monthly_totals as (
    select
      date_trunc('month', created_at) as month,
      sum(amount) as total
    from payments
    where status = 'completed'
    group by date_trunc('month', created_at)
  )
  select * from monthly_totals
  order by month desc
\`;
```

**Good:**

```tsx
// SQL keywords in uppercase are immediately recognizable
const query = \`
  SELECT [u.id](http://u.id), [u.email](http://u.email), p.amount
  FROM users u
  INNER JOIN payments p ON p.user_id = [u.id](http://u.id)
  WHERE u.status = 'active'
    AND p.created_at > $1
  ORDER BY p.created_at DESC
  LIMIT 10
\`;

// Consistent uppercase for all SQL keywords
const updateQuery = \`
  UPDATE payments
  SET status = 'processed',
      processed_at = NOW()
  WHERE id = $1
    AND status = 'pending'
\`;

// Complex queries are more readable with uppercase keywords
const report = \`
  WITH monthly_totals AS (
    SELECT
      DATE_TRUNC('month', created_at) AS month,
      SUM(amount) AS total,
      COUNT(*) AS transaction_count
    FROM payments
    WHERE status = 'completed'
      AND created_at >= $1
    GROUP BY DATE_TRUNC('month', created_at)
  )
  SELECT
    month,
    total,
    transaction_count,
    AVG(total) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
  FROM monthly_totals
  ORDER BY month DESC
\`;

// Even with query builders, use uppercase for raw SQL
const result = await this.dataSource
  .createQueryBuilder()
  .select('user')
  .from(User, 'user')
  .where('[user.email](http://user.email) = :email', { email })
  .andWhere('user.status IN (:...statuses)', { statuses: ['active', 'pending'] })
  .orderBy('user.createdAt', 'DESC')
  .getOne();
```

---

## 12. Project Structure

### 12.1. Structure NestJS Modules by Feature

Organize NestJS modules by business feature (payments, users, orders) rather than by technical layer (controllers, services, repositories). This makes the codebase more maintainable and features more portable.

**Why:** Feature-based organization keeps related code together, making it easier to understand and modify complete features. It reduces coupling between features and makes it possible to extract features into microservices later.

**Bad:**

```tsx
// Organization by technical layer - related code is scattered
src/
  controllers/
    user.controller.ts
    payment.controller.ts
    order.controller.ts
  services/
    user.service.ts
    payment.service.ts
    order.service.ts
  repositories/
    user.repository.ts
    payment.repository.ts
    order.repository.ts
  dtos/
    user.dto.ts
    payment.dto.ts
    order.dto.ts
```

**Good:**

```tsx
// Organization by feature - related code is together
src/
  users/
    user.controller.ts
    user.service.ts
    user.repository.ts
    user.entity.ts
    dto/
      create-user.dto.ts
      update-user.dto.ts
    users.module.ts
  payments/
    payment.controller.ts
    payment.service.ts
    payment.repository.ts
    payment.entity.ts
    dto/
      create-payment.dto.ts
      process-payment.dto.ts
    payments.module.ts
  orders/
    order.controller.ts
    order.service.ts
    order.repository.ts
    order.entity.ts
    orders.module.ts
```

---

## 13. Testing

Writing tests is critical for maintaining code quality and preventing regressions. Tests serve as living documentation and give you confidence when refactoring.

### 13.1. Test Complex Logic in Isolation

All complex business logic should be tested in isolation with unit tests. This includes calculations, transformations, integrations, and algorithms that contain conditional logic or multiple steps.

**Why:** Unit tests for complex logic catch bugs early, make refactoring safer, and serve as executable documentation. Testing in isolation ensures that failures pinpoint the exact source of the problem without external dependencies clouding the diagnosis.

**Bad:**

```tsx
// No tests for complex checkout calculation logic
class CheckoutService {
  calculateTotal(items: CartItem[], discounts: Discount[], taxRate: number): number {
    const subtotal = items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const itemDiscount = this.calculateItemDiscount(item, discounts);
      return

 sum + (itemTotal - itemDiscount);
    }, 0);

    const tax = subtotal * taxRate;
    const shippingFee = subtotal > 50 ? 0 : 5.99;

    return subtotal + tax + shippingFee;
  }

  private calculateItemDiscount(item: CartItem, discounts: Discount[]): number {
    // Complex discount logic without tests
    // ...
  }
}

```

**Good:**

```tsx
// checkout-calculator.service.ts
class CheckoutCalculator {
  calculateSubtotal(items: CartItem[], discounts: Discount[]): number {
    return items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const itemDiscount = this.calculateItemDiscount(item, discounts);
      return sum + (itemTotal - itemDiscount);
    }, 0);
  }

  calculateItemDiscount(item: CartItem, discounts: Discount[]): number {
    // Complex discount logic
    // ...
  }

  calculateShipping(subtotal: number): number {
    return subtotal > 50 ? 0 : 5.99;
  }

  calculateTax(subtotal: number, taxRate: number): number {
    return subtotal * taxRate;
  }
}

// checkout-calculator.service.spec.ts
describe('CheckoutCalculator', () => {
  let calculator: CheckoutCalculator;

  beforeEach(() => {
    calculator = new CheckoutCalculator();
  });

  describe('calculateSubtotal', () => {
    it('should calculate subtotal for single item without discount', () => {
      const items: CartItem[] = [{ id: '1', price: 10, quantity: 2 }];
      const discounts: Discount[] = [];

      const result = calculator.calculateSubtotal(items, discounts);

      expect(result).toBe(20);
    });

    it('should apply percentage discount correctly', () => {
      const items: CartItem[] = [{ id: '1', price: 100, quantity: 1 }];
      const discounts: Discount[] = [{ type: 'percentage', value: 0.1 }];

      const result = calculator.calculateSubtotal(items, discounts);

      expect(result).toBe(90);
    });
  });

  describe('calculateShipping', () => {
    it('should charge shipping for orders under $50', () => {
      expect(calculator.calculateShipping(49.99)).toBe(5.99);
    });

    it('should provide free shipping for orders $50 and above', () => {
      expect(calculator.calculateShipping(50)).toBe(0);
    });
  });
});

```

### 13.2. Test API Interfaces with Integration Tests

All API interfaces (REST endpoints, GraphQL resolvers, WebSocket handlers) must be tested with integration tests to ensure input validation, output structure, and resolved values match expectations.

**Why:** Integration tests verify that your API contracts are honored, catching issues with serialization, validation, authentication, and data transformation before they reach production. They ensure that the entire request-response cycle works correctly, including middleware, guards, and interceptors.

**Bad:**

```tsx
// payment.controller.ts - No integration tests
@Controller('payments')
export class PaymentController {
  @Post()
  async createPayment(@Body() dto: CreatePaymentDto): Promise<PaymentResponse> {
    return await this.paymentService.create(dto);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string): Promise<PaymentResponse> {
    return await this.paymentService.findById(id);
  }
}

```

**Good:**

```tsx
// payment.controller.ts
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPayment(@Body() dto: CreatePaymentDto): Promise<PaymentResponse> {
    return await this.paymentService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getPayment(@Param('id') id: string): Promise<PaymentResponse> {
    return await this.paymentService.findById(id);
  }
}

// payment.controller.spec.ts (integration test)
describe('PaymentController (Integration)', () => {
  let app: INestApplication;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    paymentService = moduleRef.get<PaymentService>(PaymentService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /payments', () => {
    it('should create payment with valid input', async () => {
      const createDto: CreatePaymentDto = {
        amount: 100,
        currency: 'USD',
        customerId: 'cust-123',
      };

      const expectedResponse: PaymentResponse = {

id: 'pay-123',
        amount: 100,
        currency: 'USD',
        status: 'pending',
        createdAt: new Date('2024-01-01T00:00:00Z'),
      };

      jest.spyOn(paymentService, 'create').mockResolvedValue(expectedResponse);

      const response = await request(app.getHttpServer())
        .post('/payments')
        .send(createDto)
        .expect(201);

      expect(response.body).toEqual({
        id: 'pay-123',
        amount: 100,
        currency: 'USD',
        status: 'pending',
        createdAt: '2024-01-01T00:00:00.000Z',
      });
    });

    it('should reject payment with invalid amount', async () => {
      const invalidDto = {
        amount: -100,
        currency: 'USD',
        customerId: 'cust-123',
      };

      await request(app.getHttpServer())
        .post('/payments')
        .send(invalidDto)
        .expect(400);
    });

    it('should reject payment with missing required fields', async () => {
      const invalidDto = {
        amount: 100,
      };

      await request(app.getHttpServer())
        .post('/payments')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /payments/:id', () => {
    it('should return payment by id', async () => {
      const expectedPayment: PaymentResponse = {
        id: 'pay-123',
        amount: 100,
        currency: 'USD',
        status: 'completed',
        createdAt: new Date('2024-01-01T00:00:00Z'),
      };

      jest.spyOn(paymentService, 'findById').mockResolvedValue(expectedPayment);

      const response = await request(app.getHttpServer())
        .get('/payments/pay-123')
        .expect(200);

      expect(response.body.id).toBe('pay-123');
      expect(response.body.amount).toBe(100);
    });

    it('should return 404 for non-existent payment', async () => {
      jest.spyOn(paymentService, 'findById').mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/payments/invalid-id')
        .expect(404);
    });
  });
});

```

### 13.3. Write Deterministic Tests

Tests must be deterministic and produce the same results across all environments, timezones, and runs. Avoid dependencies on system time,

random values, or external state that can vary between executions.

**Why:** Non-deterministic tests create false positives and negatives, eroding trust in your test suite. Tests that fail randomly waste developer time and make CI/CD pipelines unreliable. Deterministic tests ensure that failures always indicate real bugs.

**Bad:**

```tsx
// Non-deterministic tests
describe('OrderService', () => {
  it('should create order with current timestamp', () => {
    const order = orderService.createOrder(items);

    // Fails depending on when test runs
    expect(order.createdAt).toBe(new Date());
  });

  it('should generate unique order ID', () => {
    const order1 = orderService.createOrder(items);
    const order2 = orderService.createOrder(items);

    // Uses Math.random() - might collide occasionally
    expect(order1.id).not.toBe(order2.id);
  });

  it('should calculate order age', () => {
    const order = { createdAt: new Date('2024-01-01') };

    // Fails in different timezones or dates
    const age = orderService.getOrderAge(order);
    expect(age).toBe(365);
  });
});

```

**Good:**

```tsx
// Deterministic tests with controlled dependencies
describe('OrderService', () => {
  let orderService: OrderService;
  let mockDateService: DateService;
  let mockIdGenerator: IdGenerator;

  beforeEach(() => {
    // Mock time to fixed value
    mockDateService = {
      now: jest.fn().mockReturnValue(new Date('2024-01-15T12:00:00Z')),
    };

    // Mock ID generation to be predictable
    mockIdGenerator = {
      generate: jest.fn().mockReturnValue('order-123'),
    };

    orderService = new OrderService(mockDateService, mockIdGenerator);
  });

  it('should create order with injected timestamp', () => {
    const order = orderService.createOrder(items);

    expect(order.createdAt).toEqual(new Date('2024-01-15T12:00:00Z'));
    expect(mockDateService.now).toHaveBeenCalledTimes(1);
  });

  it('should generate deterministic order IDs', () => {
    mockIdGenerator.generate
      .mockReturnValueOnce('order-123')
      .mockReturnValueOnce('order-456');

    const order1 = orderService.createOrder(items);
    const order2 = orderService.createOrder(items);

    expect(order1.id).toBe('order-123');
    expect(order2.i

d).toBe('order-456');
  });

  it('should calculate order age from fixed timestamps', () => {
    const orderCreatedAt = new Date('2024-01-01T12:00:00Z');
    const currentTime = new Date('2024-01-15T12:00:00Z');

    mockDateService.now.mockReturnValue(currentTime);

    const age = orderService.getOrderAge({ createdAt: orderCreatedAt });

    // 14 days difference
    expect(age).toBe(14);
  });

  it('should handle timezone-independent date calculations', () => {
    // Use UTC timestamps to avoid timezone issues
    const order = {
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
    };

    mockDateService.now.mockReturnValue(new Date('2024-01-02T00:00:00.000Z'));

    const ageInDays = orderService.getOrderAgeInDays(order);

    expect(ageInDays).toBe(1);
  });
});

// date.service.ts - Injectable time dependency
@Injectable()
export class DateService {
  now(): Date {
    return new Date();
  }

  utcNow(): Date {
    const now = new Date();
    return new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    ));
  }
}
```

---

## 14. Code Maintenance

Guidelines for keeping the codebase clean and maintainable over time.

### 14.1. Remove Unused Definitions During Refactoring

When refactoring code, always check for and remove any definitions (variables, functions, methods, types, interfaces, classes) that are no longer referenced. If a refactor eliminates the last reference to a definition, that definition must be deleted in the same commit.

**Why:** Unused code creates confusion and maintenance burden. Developers waste time reading and understanding code that serves no purpose. Unused definitions can also hide bugs—future developers might assume the code is used somewhere and make incorrect assumptions. Dead code accumulates technical debt and makes the codebase harder to navigate and search.

**Bad:**

```tsx
// payment.service.ts
class PaymentService {
  // This method was used before refactoring but is now orphaned
  private calculateLegacyFee(amount: number): number {
    return amount * 0.029 + 0.30;
  }

  // This was replaced by calculateStripeFee but left behind
  private calculateProcessingFee(amount: number): number {
    return amount * 0.025;
  }

  // Current implementation - the only method actually used
  async processPayment(payment: Payment): Promise<PaymentResult> {
    const fee = this.calculateStripeFee(payment.amount);
    return await this.chargeCard(payment, fee);
  }

  private calculateStripeFee(amount: number): number {
    return amount * 0.029 + 0.30;
  }
}

// types/payment.types.ts
// Old type that's no longer used after refactoring
type LegacyPaymentMethod = {
  cardNumber: string;
  cvv: string;
};

// Current type in use
type PaymentMethod = {
  stripeTokenId: string;
};

```

**Good:**

```tsx
// payment.service.ts - cleaned up after refactoring
class PaymentService {
  async processPayment(payment: Payment): Promise<PaymentResult> {
    const fee = this.calculateStripeFee(payment.amount);
    return await this.chargeCard(payment, fee);
  }

  private calculateStripeFee(amount: number): number {
    return amount * 0.029 + 0.30;
  }
}

// types/payment.types.ts - only current types remain
type PaymentMethod = {
  stripeTokenId: string;
};

// If you must keep old code for reference, document why in a comment
// and create a ticket to remove it
type LegacyPaymentMethod = {
  cardNumber: string;
  cvv: string;
};
// TODO: Remove after migration complete (TICKET-123)
// Keeping temporarily for rollback capability until 2024-02-01

```

**How to identify unused definitions:**

1. Use your IDE's "Find Usages" or "Find References" feature
2. Use `npm run lint:unused` to find unused exports across the project
3. During code review, check that removed references don't leave orphaned definitions