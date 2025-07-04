from nexy import Request, Depends
from .service import AppService

async def POST(
    userId: int,
    service: Depends(AppService),
    request: Request,
  ) -> Dict[str, str]:

  comment_data = await request.json()
  data = await service.add_comment(userId, comment_data)

  return data
