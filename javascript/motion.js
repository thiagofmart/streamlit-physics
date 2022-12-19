function updateMotion(self, entities) {
    let entity = self.attributes;
    // Identifying border colision
    let [x0, y0, r0, vi0, vj0] = [f(entity.cx.value), f(entity.cy.value), f(entity.r.value), f(entity.vi.value), f(entity.vj.value)] 
    let lb = (x0-r0 <= 0) ? -1 : 1;
    let rb = (x0+r0 >= 100) ? -1 : 1;
    let tb = (y0-r0 <= 0.01) ? -1 : 1;
    let bb = (y0+r0 >= 99.99) ? -1 : 1;
    // Reverting the vector direction where border colision happens
    self.setAttribute("vi", `${vi0 * lb*rb}%`);
    self.setAttribute("vj", `${vj0 * tb*bb}%`);
    vi0 *= lb*rb
    vj0 *= tb*bb
    // Get the total sum of vectors that mus be applied for each entity
    let vi_total = 0;
    let vj_total = 0;
    for (var i=0; i<entities.id.length; i++) {
        if (entity.id.value != entities.id[i]) {
            var distance = ( (x0-entities.x[i])**2 + (y0-entities.y[i])**2 )**0.5
            if (distance <= r0+entities.r[i]) {
                vi_total += (entities.vi[i]-vi0)
                vj_total += (entities.vj[i]-vj0)
            }
        }
    }

    self.setAttribute("vi", `${vi0 + vi_total}%`)
    self.setAttribute("vj", `${vj0 + vj_total}%`)
    self.setAttribute("cx", `${x0 + vi0 + vi_total}%`)
    self.setAttribute("cy", `${y0 + vj0 + vj_total}%`)
}
function f(str) {
    return Number(str.slice(0, -1))
}

function startProcessing(self) {
    let entities_setter = self.getElementsByTagName("circle")
    if (localStorage.process === undefined) {
        localStorage.process = setInterval(
            function() {
                entities_setter = self.getElementsByTagName("circle")
                entities_getter = generate_getter(entities_setter)
                for (var i=0; i<entities_setter.length; i++) {
                    updateMotion(entities_setter[i], entities_getter)
                }
            },
            5,
        )
    }
}
function stopProcessing() {
    clearInterval(localStorage.process)
    delete(localStorage.process)
}
function generate_getter(entities) {
    let df = {
        "id": [],
        "x": [],
        "y": [],
        "r": [],
        "vi": [],
        "vj": [],
    }
    for (let i=0; i<entities.length; i++) {
        entity = entities[i].attributes
        df.id.push(entity.id.value)
        df.x.push(f(entity.cx.value))
        df.y.push(f(entity.cy.value))
        df.r.push(f(entity.r.value))
        df.vi.push(f(entity.vi.value))
        df.vj.push(f(entity.vj.value))
    }
    df = JSON.parse(JSON.stringify(df))
    return df
}