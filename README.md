# Simple Math Solver App

This is a React-based math application that allows users to solve mathematical problems using the [Newton API](https://github.com/aunyks/newton-api) and render equations in beautifully formatted math notation with [KaTeX](https://katex.org/docs/api).

## Install

```
npm install
```

## Running the Application

```
npm run dev
```

The application will be available at `http://localhost:5173/`

## API Usage

This application uses [Newton API](https://github.com/aunyks/newton-api). The API endpoint is:

```
https://newton.now.sh/api/v2/:operation/:expression
```

### Available endpoints

| Operation |    API Endpoint    |      Result       |
| :-------: | :----------------: | :---------------: |
| Simplify  | /simplify/2^2+2(2) |         8         |
|  Factor   |  /factor/x^2 + 2x  |     x (x + 2)     |
|  Derive   |   /derive/x^2+2x   |      2 x + 2      |
| Integrate | /integrate/x^2+2x  | 1/3 x^3 + x^2 + C |
