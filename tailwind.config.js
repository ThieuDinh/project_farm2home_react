/** @type {import('tailwindcss').Config} */
module.exports = {
  // Khai báo các file chứa class Tailwind để nó quét và tạo CSS
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Bê y nguyên các màu sắc bạn đã tự định nghĩa từ HTML sang đây
      colors: {
        primary: '#76a375',
        'primary-dark': '#5d825c',
        'primary-light': '#f0f7f0',
        brandGray: '#5c5750',
      },
      // Cấu hình font chữ mặc định
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      // Cấu hình border radius custom
      borderRadius: {
        'custom': '8px',
      }
    }
  },
  plugins: [
    // Nếu bạn có dùng plugins forms hay container-queries thì cài đặt qua npm và thêm vào đây
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/container-queries'),
  ],
}