# Worth It

A simple web application that displays USD values of ERC-20 tokens using the 1inch API. Just input a token address and get its current price instantly.

## Features

- **Simple Interface**: Single input field for ERC-20 token addresses
- **Real-time Pricing**: Get current USD values powered by 1inch APIs
- **Clean Display**: Shows token name, symbol, and price in a clear format
- **Error Handling**: User-friendly error messages for invalid inputs
- **Ethereum Mainnet**: Supports all ERC-20 tokens on Ethereum

## 1inch API Integration

This project leverages two key 1inch APIs:

### 1inch Token API
- **Endpoint**: `https://api.1inch.dev/token/v1.2/1/`
- **Purpose**: Fetches token metadata (name, symbol, decimals)
- **Usage**: Validates token addresses and retrieves token information

### 1inch Quote API  
- **Endpoint**: `https://api.1inch.dev/swap/v5.2/1/quote`
- **Purpose**: Gets real-time token prices via USDC conversion
- **Usage**: Calculates USD value for 1 unit of the input token

## Technology Stack

- **Frontend**: Next.js 14 with React
- **Styling**: Tailwind CSS
- **APIs**: 1inch Developer Portal APIs
- **Target Network**: Ethereum Mainnet (Chain ID: 1)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd token-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_1INCH_API_KEY=your_api_key_here" > .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

1. Enter a valid ERC-20 token contract address (42 characters starting with `0x`)
2. Click "Check Price" or press Enter
3. View the token's current USD value

### Test Tokens

Try these popular token addresses:
- **WETH**: `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`
- **LINK**: `0x514910771AF9Ca656af840dff83E8264EcF986CA`
- **UNI**: `0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984`

## API Requirements

To use this application, you'll need:

1. **1inch API Key**: Sign up at [1inch Developer Portal](https://portal.1inch.dev/)
2. **API Authentication**: Uses Bearer token authentication
3. **Rate Limits**: Respects 1inch API rate limiting

## Project Structure

```
token-checker/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main application page
│   │   └── api/               # API routes
│   ├── components/            # React components
│   └── lib/                   # Utilities and helpers
├── public/                    # Static assets
└── README.md                  # This file
```

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- **1inch Network** for providing the token and pricing APIs
- **Next.js** for the React framework
- **Tailwind CSS** for styling utilities
