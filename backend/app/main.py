from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import Routers
from .routes.dashboard import router as dashboard_router
from .routes.investigation import router as investigation_router

app = FastAPI(
    title="TraceIQ API",
    description="AI-Powered Cyber Threat Investigation Platform",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(dashboard_router)
app.include_router(investigation_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to TraceIQ API",
        "status": "Running"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "service": "TraceIQ Backend",
        "version": "1.0.0"
    }