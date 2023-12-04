//avoir les coordonnées des couches présentants des traces de la substance recherché
function getCoucheSubst(substance){
    return 'SELECT * FROM get_couches_subs(\'' + substance + '\')';
}

//avoir les intersections des coordonnées des couches géologique et ceux des couches qui contiennent la substance recherché
function getIntersection (coucheSubs){
    return 'SELECT code , ensemble , lithologie, ere , periode , epoque ,environnem , geom FROM lithology l WHERE ST_Intersects(ST_SetSRID(geom, 4326), ST_SetSRID(\''+coucheSubs.rows[0].get_coordonnees+'\'::geometry,4326))';
}