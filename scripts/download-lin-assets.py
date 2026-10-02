import json, pathlib, urllib.request, concurrent.futures
root=pathlib.Path(__file__).resolve().parents[1]
ref=json.loads((root/'docs/research/linresell/reference-settings.json').read_text())
jobs=[('lin-logo.png','https:'+ref['header-minimal']['logo'])]+[('lin-'+p['handle']+'.jpg','https:'+p['image']) for p in ref['products']]
def download(job):
 name,url=job
 data=urllib.request.urlopen(url,timeout=30).read()
 (root/'assets'/name).write_bytes(data)
 return {'asset':name,'source':url,'bytes':len(data)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(download,jobs))
(root/'docs/research/linresell/assets.json').write_text(json.dumps(results,indent=2)+'\n')
print('Downloaded',len(results),'assets')
