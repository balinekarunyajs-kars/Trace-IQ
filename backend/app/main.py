from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import Routers
from .routes.dashboard import router as dashboard_router
from .routes.investigation import router as investigation_router
from .routes.events import router as events_router
from .routes.transactions import router as transactions_router
from .routes.analysis import router as analysis_router

app = FastAPI(
    title="TraceIQ API",
    description="AI-Powered Cyber Threat Investigation Platform for Banking Security",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes — only once, all under /api prefix
app.include_router(dashboard_router, prefix="/api")
app.include_router(investigation_router, prefix="/api")
app.include_router(events_router, prefix="/api")
app.include_router(transactions_router, prefix="/api")
app.include_router(analysis_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "Welcome to TraceIQ API",
        "status": "Running",
        "version": "1.0.0",
        "description": "AI-Powered Banking Cyber Threat Investigation Platform",
        "docs": "/docs"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "service": "TraceIQ Backend",
        "version": "1.0.0"
    }