import { name as fakeName } from "faker";
import { NextApiRequest } from "next";

export default function handler(req: NextApiRequest, res: any) {
  const pageSize = 20;

  let dpData = Array(100)
    .fill(0)
    .reduce((p: any[]) => {
      return (
        p.push({
          name: `${fakeName.firstName()} ${fakeName.lastName()}`,
          value: p.length,
        }),
        p
      );
    }, []);
    
  let start = (parseInt(req.query.page as string) - 1) * pageSize;
  if (req.query.page) {
    dpData = dpData.slice(start, start + (parseInt(req.query.page as unknown as any) === 5 ? 10 : pageSize));
  }

  if (req.query.searchKey){
    let searchKey = (req.query.searchKey as unknown as string).replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
     dpData = dpData.filter(d=> d.name.match(new RegExp(searchKey,"gi"))); 
  }

  res.send(dpData);
}
