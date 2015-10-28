import logging
import json
import time
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from profile4peace.models import User
from django.views.decorators.clickjacking import xframe_options_exempt

__author__ = 'Nidin'

logger = logging.getLogger(__name__)
on_inactivity_expire_time = 28800
session_expired_response = "session_expired"


@xframe_options_exempt
@csrf_exempt
def index(request):
    request_context = RequestContext(request)
    return render_to_response('index.html', request_context)


@ensure_csrf_cookie
def make_peace(request):
    if request.method == 'POST':
        request_body = request.body.decode(encoding='UTF-8')
        param = json.loads(request_body)
        user = User(fb_id=param.fbId, name=param.name, country=param.country, time=time.clock())
        user.save()
        return JSONResponse({"success": True})
    else:
        return JSONResponse({"success": False, "reason": "Invalid request"})


class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)
