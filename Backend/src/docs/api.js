const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Định nghĩa cấu hình cho Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation for 'Dom Store Project'",
      version: "1.0.0",
      description:
        "This is the API documentation for 'Dom Store Project' application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          // Đổi tên thành bearerAuth để phù hợp với tiêu chuẩn Bearer Token
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Thêm bearerFormat để chỉ rõ loại token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Áp dụng security scheme cho toàn bộ API
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

// Tạo swagger specs
const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app, port) => {
  // Thiết lập đường dẫn để xem tài liệu Swagger
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger docs available at http://localhost:${port}/`);
};

module.exports = setupSwaggerDocs;
