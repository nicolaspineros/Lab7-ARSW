/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author hcadavid
 */
@Service("InMemoryBlueprintPersistence")
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final ConcurrentHashMap<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts=new Point[]{new Point(140, 140),new Point(115, 115)};
        Point[] pts1=new Point[]{new Point(10, 10),new Point(15, 10)};
        Point[] pts2=new Point[]{new Point(14, 14),new Point(20, 20)};
        Blueprint bp=new Blueprint("Juan", "bp",pts);
        Blueprint bp1=new Blueprint("Nicolas", "bp1 ",pts1);
        Blueprint bp2=new Blueprint("Nicolas", "bp2 ",pts2);
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.putIfAbsent(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    @Override
    public HashSet<Blueprint> getAllBlueprints(){
        return new HashSet<Blueprint>(blueprints.values());
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException{
        Set<Blueprint> resp = new HashSet<>();
        Set<Tuple<String,String>> llaves = blueprints.keySet();
        for (Tuple<String,String> i : llaves){
            if (i.getElem1().equals(author)){
                resp.add(blueprints.get(i));
            }
        }
        return resp;
    }

    @Override
    public void updateBlueprint(Blueprint bp, String author, String name) throws BlueprintNotFoundException {
        Blueprint lvbp=getBlueprint(author,name);
        lvbp.setPoints(bp.getPoints());
    }

}
