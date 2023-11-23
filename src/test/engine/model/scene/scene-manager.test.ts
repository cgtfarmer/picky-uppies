import Bounds from '@/main/engine/model/bounds';
import Scene from '@/main/engine/model/scene/scene';
import SceneManager from '@/main/engine/model/scene/scene-manager';
import Vector2 from '@/main/engine/model/vector2';

describe('constructor', () => {

  test('constructs successfully', () => {
    const sceneManager: SceneManager = new SceneManager();
  });
});

describe('addScene', () => {

  describe('given no scenes present', () => {

    test('adds scene', () => {
      const sceneManager: SceneManager = new SceneManager();

      const scene: Scene = new Scene(Bounds.zero());

      sceneManager.addScene(scene);

      expect(sceneManager.findSceneIndex(scene))
        .not.toBeNull();
    });

    test('assigns to activeScene', () => {
      const sceneManager: SceneManager = new SceneManager();

      const scene: Scene = new Scene(Bounds.zero());

      sceneManager.addScene(scene);

      expect(sceneManager.getActiveScene())
        .toBe(scene);
    });
  });

  describe('given some scenes present', () => {

    test('adds scene', () => {
      const sceneManager: SceneManager = new SceneManager();

      const scene1: Scene = new Scene(Bounds.zero());
      const scene2: Scene = new Scene(Bounds.zero());

      sceneManager.addScene(scene1);
      sceneManager.addScene(scene2);

      expect(sceneManager.findSceneIndex(scene2))
        .toBeTruthy();
    });

    test('does not assign to activeScene', () => {
      const sceneManager: SceneManager = new SceneManager();

      const scene1: Scene = new Scene(Bounds.zero());
      const scene2: Scene = new Scene(Bounds.zero());

      sceneManager.addScene(scene1);
      sceneManager.addScene(scene2);

      expect(sceneManager.getActiveScene())
        .not.toBe(scene2);
    });
  });
});

describe('removeScene', () => {

  describe('given one scene present', () => {

    test('then removes scene', () => {
      const sceneManager: SceneManager = new SceneManager();

      const scene: Scene = new Scene(Bounds.zero());
      sceneManager.addScene(scene);

      sceneManager.removeScene(scene);
      expect(sceneManager.findSceneIndex(scene))
        .toBeNull();
    });

    test('then nullifies activeScene', () => {
      const sceneManager: SceneManager = new SceneManager();

      const scene: Scene = new Scene(Bounds.zero());
      sceneManager.addScene(scene);

      sceneManager.removeScene(scene);
      expect(sceneManager.getActiveScene())
        .toBeNull();
    });
  });

  describe('given multiple scenes present', () => {

    describe('and scene is not activeScene', () => {

      test('removes scene', () => {
        const sceneManager: SceneManager = new SceneManager();

        const scene1: Scene = new Scene(Bounds.zero());
        const scene2: Scene = new Scene(Bounds.zero());
        sceneManager.addScene(scene1);
        sceneManager.addScene(scene2);

        sceneManager.removeScene(scene2);
        expect(sceneManager.findSceneIndex(scene2))
          .toBeNull();
      });

      test('preserves activeScene', () => {
        const sceneManager: SceneManager = new SceneManager();

        const scene1: Scene = new Scene(Bounds.zero());
        const scene2: Scene = new Scene(Bounds.zero());
        sceneManager.addScene(scene1);
        sceneManager.addScene(scene2);

        sceneManager.removeScene(scene2);
        expect(sceneManager.getActiveScene())
          .toBe(scene1);
      });
    });

    describe('and scene is activeScene', () => {

      test('removes scene', () => {
        const sceneManager: SceneManager = new SceneManager();

        const scene1: Scene = new Scene(Bounds.zero());
        const scene2: Scene = new Scene(Bounds.zero());
        sceneManager.addScene(scene1);
        sceneManager.addScene(scene2);

        sceneManager.removeScene(scene1);
        expect(sceneManager.findSceneIndex(scene1))
          .toBeNull();
      });

      test('nullifies activeScene', () => {
        const sceneManager: SceneManager = new SceneManager();

        const scene1: Scene = new Scene(Bounds.zero());
        const scene2: Scene = new Scene(Bounds.zero());
        sceneManager.addScene(scene1);
        sceneManager.addScene(scene2);

        sceneManager.removeScene(scene1);
        expect(sceneManager.getActiveScene())
          .toBeNull();
      });
    });
  });
});

describe('findSceneIndex', () => {

  test('given no scenes, returns null', () => {
    const sceneManager: SceneManager = new SceneManager();

    const scene1: Scene = new Scene(Bounds.zero());

    expect(sceneManager.findSceneIndex(scene1))
      .toBeNull();
  });

  test('given 1 scene, returns 0 index', () => {
    const sceneManager: SceneManager = new SceneManager();

    const scene1: Scene = new Scene(Bounds.zero());

    sceneManager.addScene(scene1);
    expect(sceneManager.findSceneIndex(scene1))
      .toBe(0);
  });

  test('given multiple scenes, returns correct index', () => {
    const sceneManager: SceneManager = new SceneManager();

    const scene1: Scene = new Scene(Bounds.zero());
    const scene2: Scene = new Scene(Bounds.zero());
    const scene3: Scene = new Scene(Bounds.zero());

    sceneManager.addScene(scene1);
    sceneManager.addScene(scene2);
    sceneManager.addScene(scene3);

    expect(sceneManager.findSceneIndex(scene2))
      .toBe(1);
  });
});
