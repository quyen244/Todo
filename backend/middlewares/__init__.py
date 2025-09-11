from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # hoặc ["*"] nếu chỉ test local
    allow_methods=["*"],
    allow_headers=["*"],
)
